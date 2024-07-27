import { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";
import ImageRotation from "../components/imageRotery";
import hf from "../assets/hf-logo.svg";
import anthopic from "../assets/Anthropic.svg";
import openAI from "../assets/openai-logomark.svg";
import copy from "../assets/copy.svg";
import check from "../assets/check.svg";
import {
  getEncoding,
  getEncodingNameForModel,
  Tiktoken,
  TiktokenModel,
} from "js-tiktoken";
import { toBase64, toBinary, toLeetspeak, toRandomEmoji } from "../utils";
import {
  AppState,
  DropdownSetting,
  GroupSetting,
  Setting,
  ToggleSetting,
  initialState,
  tiktokenModels,
} from "../types";

function isTiktokenModel(value: any): value is TiktokenModel {
  const models: TiktokenModel[] = [
    "davinci-002",
    "babbage-002",
    "text-davinci-003",
    "text-davinci-002",
    "text-davinci-001",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
    "code-davinci-002",
    "code-davinci-001",
    "code-cushman-002",
    "code-cushman-001",
    "davinci-codex",
    "cushman-codex",
    "text-davinci-edit-001",
    "code-davinci-edit-001",
    "text-embedding-ada-002",
    "text-similarity-davinci-001",
    "text-similarity-curie-001",
    "text-similarity-babbage-001",
    "text-similarity-ada-001",
    "text-search-davinci-doc-001",
    "text-search-curie-doc-001",
    "text-search-babbage-doc-001",
    "text-search-ada-doc-001",
    "code-search-babbage-code-001",
    "code-search-ada-code-001",
    "gpt2",
    "gpt-3.5-turbo",
    "gpt-35-turbo",
    "gpt-3.5-turbo-0301",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-1106",
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-instruct",
    "gpt-3.5-turbo-instruct-0914",
    "gpt-4",
    "gpt-4-0314",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-32k-0314",
    "gpt-4-32k-0613",
    "gpt-4-turbo",
    "gpt-4-turbo-2024-04-09",
    "gpt-4-turbo-preview",
    "gpt-4-1106-preview",
    "gpt-4-0125-preview",
    "gpt-4-vision-preview",
    "gpt-4o",
    "gpt-4o-2024-05-13",
  ];
  return models.includes(value);
}

const TextAreaWithCopyButton = ({
  id,
  value,
  placeholder,
}: {
  id: string;
  value: string;
  placeholder: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const element = document.getElementById(id);
    if (element instanceof HTMLTextAreaElement) {
      navigator.clipboard.writeText(element.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 relative mb-4">
      <textarea
        id={id}
        className="w-full h-full p-2 pr-24 border border-gray-100 rounded-md shadow-md text-gray-600 resize-none"
        disabled
        value={value}
        placeholder={placeholder}
      ></textarea>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-[2px] bg-gray-200 text-white rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        {!copied ? (
          <img src={copy} className="w-5 h-5 text-gray-300 " loading="lazy" />
        ) : (
          <img src={check} className="w-5 h-5 text-gray-300 " loading="lazy" />
        )}
      </button>
    </div>
  );
};

function isToggleSetting(setting: Setting): setting is ToggleSetting {
  return setting.type === "toggle";
}

function isDropdownSetting(setting: Setting): setting is ToggleSetting {
  return setting.type === "dropdown";
}

function isGroupSetting(setting: Setting): setting is GroupSetting {
  return setting.type === "group";
}

export default function SidePanel() {
  const [tokenizedText, setTokenizedText] = useState<JSX.Element[] | null>(
    null
  );
  const [leetspeakText, setLeetspeakText] = useState("");
  const [base64Text, setBase64Text] = useState("");
  const [binaryText, setBinaryText] = useState("");
  const [emojiText, setEmojiText] = useState("");
  const [encoder, setEncoder] = useState(
    getEncoding(getEncodingNameForModel("gpt-4o"))
  );

  const images = [openAI, anthopic, hf];
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    const fetchStoredState = async () => {
      try {
        const storedState = await browser.storage.sync.get(null);
        console.log(storedState);

        setState((prevState) => {
          const newState = { ...prevState };

          // Update isActive
          if ("isActive" in storedState) {
            newState.isActive = storedState.isActive;
          }

          // Update settings
          Object.entries(newState.settings).forEach(([key, setting]) => {
            if (setting.type === "toggle") {
              if (key in storedState) {
                (setting as ToggleSetting).value = storedState[key];
              }
            } else if (setting.type === "group") {
              Object.entries((setting as GroupSetting).children).forEach(
                ([childKey, childSetting]) => {
                  const fullKey = `${key}.${childKey}`;
                  if (
                    childSetting.type === "toggle" &&
                    fullKey in storedState
                  ) {
                    (childSetting as ToggleSetting).value =
                      storedState[fullKey];
                  } else if (
                    childSetting.type === "dropdown" &&
                    fullKey in storedState
                  ) {
                    if (
                      isGroupSetting(newState.settings.tokens) &&
                      isDropdownSetting(
                        newState.settings.tokens.children.tokenizer
                      )
                    ) {
                      const encoderName =
                        newState.settings.tokens.children.tokenizer.value;
                      if (isTiktokenModel(encoderName)) {
                        try {
                          const newEncoder = getEncoding(
                            getEncodingNameForModel(encoderName)
                          );
                          setEncoder(newEncoder);
                        } catch (error) {
                          console.error(
                            `Failed to set encoder for ${encoderName}:`,
                            error
                          );
                        }
                      } else {
                        console.error(`Invalid encoder name: ${encoderName}`);
                      }
                    }
                    (childSetting as DropdownSetting).value =
                      storedState[fullKey];
                  }
                }
              );
            }
          });

          return newState;
        });
      } catch (error) {
        console.error("Error fetching state from storage:", error);
      }
    };

    const messageListener = (message: any) => {
      if (message.action === "updateElementText") {
        setTokenizedText(promptToTokens(message.text, encoder));
        setLeetspeakText(toLeetspeak(message.text));
        setBase64Text(toBase64(message.text));
        setEmojiText(toRandomEmoji(message.text))
        setBinaryText(toBinary(message.text))
      }
    };

    fetchStoredState();
    browser.runtime.onMessage.addListener(messageListener);
    browser.storage.onChanged.addListener(fetchStoredState);
    return () => {
      browser.runtime.onMessage.removeListener(messageListener);
      browser.storage.onChanged.removeListener(fetchStoredState);
    };
  }, []);

  useEffect(() => {
    setTokenizedText(promptToTokens(atob(base64Text), encoder));
  }, [encoder]);

  const promptToTokens = (text: string, encoder: Tiktoken) => {
    const colors = [
      "bg-red-200",
      "bg-green-200",
      "bg-blue-200",
      "bg-yellow-200",
    ];
    const encoding: number[] = encoder.encode(text);

    return encoding.map((token: number, index: number) => {
      const colorClass = colors[index % colors.length];
      return (
        <span className={`${colorClass} animate-fadeIn `} key={index}>
          {encoder.decode([token])}
        </span>
      );
    });
  };

  const [selectedOutput, setSelectedOutput] = useState("leetspeak");

  const outputOptions = [
    { value: "leetspeak", label: "Leetspeak" },
    { value: "base64", label: "Base64" },
    { value: "binary", label: "Binary" },
    { value: "emoji", label: "Emoji" },
  ];

  if (!state.isActive) {
    return (
      <div className={`flex items-center justify-center w-screen h-screen`}>
        <div className="text-center">
          <ImageRotation className="mx-auto w-10 h-10" images={images} />
          <p className="mt-4 text-md">
            Currently Inactive, you need click the activate button in the pop
          </p>
        </div>
      </div>
    );
  }

  const showTokens: boolean =
    isGroupSetting(state.settings.tokens) &&
    isToggleSetting(state.settings.tokens.children.show_tokens) &&
    state.settings.tokens.children.show_tokens.value;

  const showLeetspeak: boolean =
    isToggleSetting(state.settings.leetspeak) && state.settings.leetspeak.value;
  const showBase64: boolean =
    isToggleSetting(state.settings.base64) && state.settings.base64.value;

  if (!showTokens && !showLeetspeak && !showBase64) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center">
          <ImageRotation className="mx-auto w-10 h-10" images={images} />
          <p className="mt-4 text-lg">None of the utils are activated</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="h-full w-full max-w-md p-6 bg-white rounded-lg shadow-md flex flex-col">
        <h1 className="text-2xl font-extrabold mb-4 flex items-center justify-center text-center">
        ParselTongue
        </h1>

        <select
          value={selectedOutput}
          onChange={(e) => setSelectedOutput(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md bg-slate-50 shadow-md"
        >
          {outputOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {showTokens && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Tokenizer 😀
            </h2>
            <div
              id="tokenizer"
              className="whitespace-wrap flex-none h-40 p-2 border border-gray-100 rounded-md shadow-md text-gray-600 resize-none mb-4 overflow-auto"
            >
              {tokenizedText}
            </div>
          </>
        )}

        {(selectedOutput === "all" || selectedOutput === "leetspeak") &&
          showLeetspeak && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-center">
                Leetspeak 🦜
              </h2>
              <TextAreaWithCopyButton
                id="leetspeak"
                value={leetspeakText}
                placeholder="Leetspeak 🦜 output will appear here"
              />
            </>
          )}

        {(selectedOutput === "all" || selectedOutput === "base64") &&
          showBase64 && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-center">
                Base64 🧬
              </h2>
              <TextAreaWithCopyButton
                id="base64"
                value={base64Text}
                placeholder="Base64 🧬 output will appear here"
              />
            </>
          )}


        {(selectedOutput === "all" || selectedOutput === "binary") &&
          showBase64 && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-center">
                Binary 💾
              </h2>
              <TextAreaWithCopyButton
                id="base64"
                value={binaryText}
                placeholder="Binary 💾 output will appear here"
              />
            </>
          )}


        {(selectedOutput === "all" || selectedOutput === "emoji") &&
          showBase64 && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-center">
                Emoji ✨
              </h2>
              <TextAreaWithCopyButton
                id="base64"
                value={emojiText}
                placeholder="Emoji ✨ output will appear here"
              />
            </>
          )}
      </div>
    </div>
  );
}
