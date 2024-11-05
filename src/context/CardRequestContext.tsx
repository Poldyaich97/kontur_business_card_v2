import React, { createContext, useContext, useState } from 'react';

interface CardRequest {
  name: string;
  phone: string;
  employeeId: number;
  timestamp: string;
}

interface CardRequestContextType {
  requests: CardRequest[];
  addRequest: (request: CardRequest) => void;
}

const CardRequestContext = createContext<CardRequestContextType | undefined>(undefined);

export const CardRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<CardRequest[]>([]);

  const addRequest = (request: CardRequest) => {
    setRequests(prev => [...prev, request]);
  };

  return (
    <CardRequestContext.Provider value={{ requests, addRequest }}>
      {children}
    </CardRequestContext.Provider>
  );
};

export const useCardRequests = () => {
  const context = useContext(CardRequestContext);
  if (context === undefined) {
    throw new Error('useCardRequests must be used within a CardRequestProvider');
  }
  return context;
};