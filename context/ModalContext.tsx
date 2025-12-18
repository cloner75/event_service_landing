'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
  open: 'dopin' | 'main' | undefined;
  openModal: (modalName: 'dopin' | 'main') => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<'dopin' | 'main' | undefined>(undefined);

  const openModal = (modalName: 'dopin' | 'main') => setOpen(modalName);
  const closeModal = () => setOpen(undefined);

  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used inside ModalProvider');
  return context;
}
