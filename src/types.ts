export const tiktokenModels : string[] = [ "gpt2",
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
"gpt-4o-2024-05-13"];


export type SettingType = 'toggle' | 'dropdown' | 'group';

export interface BaseSetting {
  type: SettingType;
  description: string;
}

export interface ToggleSetting extends BaseSetting {
  type: 'toggle';
  value: boolean;
}

export interface DropdownSetting extends BaseSetting {
  type: 'dropdown';
  value: string;
  options: string[];
}

export interface GroupSetting extends BaseSetting {
  type: 'group';
  children: {
    [key: string]: Setting;
  };
}

export type Setting = ToggleSetting | DropdownSetting | GroupSetting;

export interface AppState {
  isActive: boolean;
  settings: {
    [key: string]: Setting;
  };
}

export const initialState: AppState = {
  isActive: false,
  settings: {
    tokens: {
      type: 'group',
      description: "Token Settings (beta)",
      children: {
        show_tokens: {
          type: 'toggle',
          value: false,
          description: "Highlight the model tokens"
        },
        tokenizer: {
          type: 'dropdown',
          value: 'gpt-4o',
          description: "Select tokenizer",
          options: tiktokenModels
        }
      }
    },
    leetspeak: {
      type: 'toggle',
      value: true,
      description: "Convert words into 1337."
    },
    base64: {
      type: 'toggle',
      value: true,
      description: "Convert words into base64."
    },
    pigLatin: {
      type: 'toggle',
      value: true,
      description: "Convert words into pig latin."
    },
    binary: {
      type: 'toggle',
      value: true,
      description: "Convert words into binary."
    },
    emoji: {
      type: 'toggle',
      value: true,
      description: "Convert words into emojis."
    },
    // theme: {
    //   type : 'dropdown',
    //   value: 'dark',
    //   options: ['dark', 'light'],
    //   description: "Theme Settings"
    // }
  }
};