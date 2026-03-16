'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  FileText, 
  Scale, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
  Wallet,
  ArrowLeft,
  Download,
  ExternalLink
} from 'lucide-react';

const SAFT_SECTIONS = [
  {
    id: 'definitions',
    title: '1. Definitions',
    content: `
      "Company" means VODeco Labs Inc., a corporation organized under the laws of [Jurisdiction].
      
      "Investor" means the person or entity purchasing Tokens under this Agreement.
      
      "Tokens" means VODeco (VOD) utility tokens issued on the Polygon blockchain.
      
      "Purchase Price" means the total amount paid by Investor for the Tokens.
      
      "Token Sale" means the offering of Tokens by the Company to qualified investors.
    `
  },
  {
    id: 'purchase',
    title: '2. Purchase of Tokens',
    content: `
      2.1 Sale of Tokens. Subject to the terms and conditions of this Agreement, the Investor agrees to purchase, and the Company agrees to sell, the number of Tokens specified in Schedule A.
      
      2.2 Purchase Price. The Investor shall pay the Purchase Price as set forth in Schedule A.
      
      2.3 Payment Method. Payment shall be made in USDT, USDC, ETH, or BTC to the wallet address provided by the Company.
      
      2.4 Token Delivery. Tokens will be delivered to the Investor's designated wallet address upon the completion of the Token Generation Event (TGE).
    `
  },
  {
    id: 'vesting',
    title: '3. Vesting and Lock-up',
    content: `
      3.1 Vesting Schedule. Tokens purchased under this Agreement shall be subject to the following vesting schedule:
      - 20% released at TGE
      - 20% released at Month 3
      - 20% released at Month 6
      - 20% released at Month 9
      - 20% released at Month 12
      
      3.2 Lock-up Period. Notwithstanding the vesting schedule, all tokens are subject to a 6-month lock-up period from the date of TGE.
      
      3.3 Early Release. The Company may, at its sole discretion, accelerate the vesting schedule under extraordinary circumstances.
    `
  },
  {
    id: 'representations',
    title: '4. Investor Representations',
    content: `
      4.1 Accredited Investor. The Investor represents that they are an accredited investor as defined under applicable securities laws.
      
      4.2 Risk Acknowledgment. The Investor acknowledges that:
      - Token value may fluctuate significantly
      - The project is in early development stage
      - Regulatory environment may change
      - Technology risks exist
      
      4.3 Due Diligence. The Investor has conducted their own due diligence and is not relying on any representations other than those in this Agreement.
    `
  },
  {
    id: 'company',
    title: '5. Company Representations',
    content: `
      5.1 Corporate Authority. The Company is duly organized and has full authority to enter into this Agreement.
      
      5.2 No Conflicts. The execution of this Agreement does not conflict with any other agreement or obligation of the Company.
      
      5.3 Token Utility. The Company represents that Tokens are utility tokens designed for use within the LoopOrb ecosystem.
      
      5.4 Development Roadmap. The Company commits to the development roadmap as published in the whitepaper.
    `
  },
  {
    id: 'restrictions',
    title: '6. Transfer Restrictions',
    content: `
      6.1 General Restrictions. Tokens may not be transferred, sold, or otherwise disposed of except in compliance with applicable laws.
      
      6.2 Securities Laws. The Investor acknowledges that Tokens may be subject to securities laws in certain jurisdictions.
      
      6.3 Company Consent. Any transfer requires prior written consent from the Company during the first 12 months.
    `
  },
  {
    id: 'risks',
    title: '7. Risk Factors',
    content: `
      7.1 Regulatory Risk. Changes in regulations may affect the viability of the project or the value of Tokens.
      
      7.2 Technology Risk. Smart contract vulnerabilities, blockchain failures, or other technical issues may occur.
      
      7.3 Market Risk. There is no guarantee of liquidity or market value for Tokens.
      
      7.4 Competition Risk. Other projects may develop similar or superior solutions.
      
      7.5 Team Risk. The success of the project depends on the continued involvement of the core team.
    `
  },
  {
    id: 'miscellaneous',
    title: '8. Miscellaneous',
    content: `
      8.1 Governing Law. This Agreement shall be governed by the laws of [Jurisdiction].
      
      8.2 Dispute Resolution. Any disputes shall be resolved through arbitration in [Arbitration Venue].
      
      8.3 Amendments. This Agreement may only be amended in writing signed by both parties.
      
      8.4 Severability. If any provision is found invalid, the remaining provisions shall remain in effect.
      
      8.5 Entire Agreement. This Agreement constitutes the entire agreement between the parties.
    `
  }
];

export default function SaftPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        {/* Header */}
        <section className="relative py-12 px-4 border-b border-white/10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/token-sale"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Token Sale
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
                <Scale className="w-4 h-4" />
                Legal Document
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  SAFT Agreement
                </span>
              </h1>

              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Simple Agreement for Future Tokens - Legal framework for token purchase
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl transition-all">
                  <ExternalLink className="w-5 h-5" />
                  View on IPFS
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Document Info */}
        <section className="py-8 px-4 bg-slate-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Version', value: '2.1', icon: FileText },
                { label: 'Last Updated', value: 'March 2026', icon: Clock },
                { label: 'Jurisdiction', value: 'Singapore', icon: Scale },
                { label: 'Token Standard', value: 'ERC-20', icon: Shield },
              ].map((item, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 text-center">
                  <item.icon className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
                  <p className="text-slate-400 text-xs">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Important Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
              <div className="flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="text-amber-400 font-semibold mb-2">Important Legal Notice</h3>
                  <p className="text-slate-400 text-sm">
                    This is a summary of the SAFT Agreement. By participating in the token sale, 
                    you agree to the full terms and conditions. Please consult with a legal advisor 
                    before signing. This document does not constitute legal advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Sections */}
            <div className="space-y-8">
              {SAFT_SECTIONS.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  id={section.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                  <div className="prose prose-invert prose-slate max-w-none">
                    {section.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-slate-400 leading-relaxed mb-4 whitespace-pre-line">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Signature Section */}
            <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-cyan-500" />
                Digital Signature Required
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">For Investor:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Review complete SAFT document</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Connect wallet for verification</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle className="w-5 h-5 text-slate-500" />
                      <span>Sign with wallet</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-4">Company Details:</h3>
                  <div className="space-y-2 text-sm text-slate-400">
                    <p>VODeco Labs Inc.</p>
                    <p>Registration: [Jurisdiction]</p>
                    <p>Address: [Company Address]</p>
                    <p>Representative: [Authorized Signatory]</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/token-sale"
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl text-center transition-all"
                >
                  Proceed to Token Sale
                </Link>
                <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl border border-white/10 transition-all">
                  Download Full Agreement
                </button>
              </div>
            </div>

            {/* Contact Legal */}
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                Questions about this agreement? Contact our legal team at{' '}
                <a href="mailto:legal@looporb.io" className="text-cyan-400 hover:underline">
                  legal@looporb.io
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
