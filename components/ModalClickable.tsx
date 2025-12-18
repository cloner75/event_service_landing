'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';

interface DopinModalProps {
  trigger?: React.ReactNode | any;
  modalName: 'dopin' | 'main';
}

export default function ModalClickable({
  trigger,
  modalName,
}: DopinModalProps) {
  const { openModal } = useModal();

  const enhancedTrigger = trigger;

  return (
    enhancedTrigger &&
    React.cloneElement(enhancedTrigger as any, {
      onClick: (e: any) => {
        trigger?.props?.onClick?.(e);
        openModal(modalName);
      },
    })
  );
}
