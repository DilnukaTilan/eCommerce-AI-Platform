"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import {
  createChatStore,
  type ChatStore,
  type ChatState,
  defaultInitState,
} from "./chat-store";

export type ChatStoreApi = ReturnType<typeof createChatStore>;

const ChatStoreContext = createContext<ChatStoreApi | undefined>(undefined);

interface ChatStoreProviderProps {
  children: ReactNode;
  initialState?: ChatState;
}

export const ChatStoreProvider = ({
  children,
  initialState,
}: ChatStoreProviderProps) => {
  const storeRef = useRef<ChatStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createChatStore(initialState ?? defaultInitState);
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChatStore = <T,>(selector: (store: ChatStore) => T): T => {
  const chatStoreContext = useContext(ChatStoreContext);

  if (!chatStoreContext) {
    throw new Error("useChatStore must be used within ChatStoreProvider");
  }

  return useStore(chatStoreContext, selector);
};

export const useIsChatOpen = () => useChatStore((state) => state.isOpen);

export const usePendingMessage = () =>
  useChatStore((state) => state.pendingMessage);

export const useChatActions = () => {
  const openChat = useChatStore((state) => state.openChat);
  const openChatWithMessage = useChatStore(
    (state) => state.openChatWithMessage,
  );
  const closeChat = useChatStore((state) => state.closeChat);
  const toggleChat = useChatStore((state) => state.toggleChat);
  const clearPendingMessage = useChatStore(
    (state) => state.clearPendingMessage,
  );

  return {
    openChat,
    openChatWithMessage,
    closeChat,
    toggleChat,
    clearPendingMessage,
  };
};
