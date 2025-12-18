'use client';

import { useModal } from '@/context/ModalContext';
import DopinModal from './Main/DopinModal';
import DownloadModal from './Main/DownloadModal';

export default function GlobalDopinModal() {
  const { open } = useModal();

  if (open == undefined) return null;
  else if (open == 'dopin') return <DopinModal />;
  else return <DownloadModal />;
}
