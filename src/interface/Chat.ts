export interface Message {
    type: 'assistant' | 'system' | 'user',
    content: string
  }