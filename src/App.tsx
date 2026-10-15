/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MOCK_STOCKS } from './data/mockStocks';
import { StockProfile, PlaybookType } from './types/equity';
import { Header } from './components/Header';
import { TickerBar } from './components/TickerBar';
import { QuickScreenView } from './components/QuickScreenView';
import { DeepDiveView } from './components/DeepDiveView';
import { QuarterlyReviewView } from './components/QuarterlyReviewView';
import { PeerComparisonView } from './components/PeerComparisonView';
import { WatchlistScannerView } from './components/WatchlistScannerView';
import { ScreenBuilderView } from './components/ScreenBuilderView';
import { IpoAndEventsView } from './components/IpoAndEventsView';
import { MultiAgentRoom } from './components/MultiAgentRoom';
import { VerificationModal } from './components/VerificationModal';

export default function App() {
  const [stocks] = useState<StockProfile[]>(MOCK_STOCKS);
  const [selectedStock, setSelectedStock] = useState<StockProfile>(MOCK_STOCKS[0]);
  const [activePlaybook, setActivePlaybook] = useState<PlaybookType>('quick-screen');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  // Filter stocks by search
  const filteredStocks = stocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bseCode.includes(searchQuery)
  );

  const handleSelectStock = (stock: StockProfile) => {
    setSelectedStock(stock);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar Navigation */}
      <Header
        activePlaybook={activePlaybook}
        onSelectPlaybook={(playbook) => setActivePlaybook(playbook)}
        onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
      />

      {/* Stock Ticker Bar */}
      <TickerBar
        stocks={filteredStocks.length > 0 ? filteredStocks : stocks}
        selectedStock={selectedStock}
        onSelectStock={handleSelectStock}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Terminal Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activePlaybook === 'quick-screen' && (
          <QuickScreenView stock={selectedStock} />
        )}

        {activePlaybook === 'deep-dive' && (
          <DeepDiveView stock={selectedStock} />
        )}

        {activePlaybook === 'quarterly-review' && (
          <QuarterlyReviewView stock={selectedStock} />
        )}

        {activePlaybook === 'peer-comparison' && (
          <PeerComparisonView stock={selectedStock} />
        )}

        {activePlaybook === 'watchlist-scanner' && (
          <WatchlistScannerView
            availableStocks={stocks}
            onSelectStock={(stk) => {
              setSelectedStock(stk);
              setActivePlaybook('quick-screen');
            }}
          />
        )}

        {activePlaybook === 'screen-builder' && (
          <ScreenBuilderView
            stocks={stocks}
            onSelectStock={(stk) => {
              setSelectedStock(stk);
              setActivePlaybook('quick-screen');
            }}
          />
        )}

        {activePlaybook === 'ipo-analyzer' && (
          <IpoAndEventsView />
        )}

        {activePlaybook === 'multi-agent-room' && (
          <MultiAgentRoom stock={selectedStock} />
        )}
      </main>

      {/* Global Terminal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 text-xs font-mono text-slate-500 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold">BharatEquity Terminal</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>AGENTS.md Protocol v2.4</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Settlement: T+1 (NSE / BSE)</span>
          </div>
          <div>
            Data sourced from official exchange filings, Annual Reports, & RBI bulletins.
          </div>
        </div>
      </footer>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        stock={selectedStock}
      />
    </div>
  );
}
