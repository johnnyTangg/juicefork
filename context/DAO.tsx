"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { DAO } from '../app/Data/CloneYard';

interface DaoContextType {
  selectedDao: DAO | null;
  setSelectedDao: (dao: DAO) => void;
}

const DaoContext = createContext<DaoContextType | undefined>(undefined);

export const DaoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDao, setSelectedDao] = useState<DAO | null>(null);

  return (
    <DaoContext.Provider value={{ selectedDao, setSelectedDao }}>
      {children}
    </DaoContext.Provider>
  );
};

export const useDao = () => {
  const context = useContext(DaoContext);
  if (!context) {
    throw new Error('useDao must be used within a DaoProvider');
  }
  return context;
};