import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Users, 
  Construction, 
  Leaf, 
  Store, 
  Landmark, 
  Handshake, 
  Building2, 
  Wallet 
} from 'lucide-react';
import Logo from './Logo';

const items = [
  { icon: Users, label: "Family Offices" },
  { icon: Construction, label: "Promotores y Desarrolladores" },
  { icon: Leaf, label: "Empresas Agrícolas & Inversores en Farmland" },
  { icon: Store, label: "Comercios, Franquicias & Cadenas Retail" },
  { icon: Landmark, label: "Gobiernos, Urbanistas & Instituciones Públicas" },
  { icon: Handshake, label: "Brokers, Agentes & Marketplaces" },
  { icon: Building2, label: "Fondos de Inversión & Private Equity" },
  { icon: Wallet, label: "Bancos de Inversión & Private Equity" },
  { icon: User, label: "Inversores Particulares" },
];

const HubDiagram: React.FC = () => {
  const radius = 320; // Base radius for desktop

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Hub */}
      <motion.div 
        initial={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 w-48 h-48 md:w-56 md:h-56 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center"
      >
        <div className="scale-50 md:scale-60">
          <Logo />
        </div>
      </motion.div>

      {/* Connector Rays */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        {items.map((_, i) => {
          const angle = (i * (360 / items.length)) - 90;
          return (
            <div 
              key={i}
              className="absolute h-px origin-left"
              style={{ 
                width: `${radius}px`,
                transform: `rotate(${angle}deg)`,
                left: '50%',
                top: '50%',
              }}
            >
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.2 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 1.2, ease: "easeOut" }}
                className="w-full h-full bg-gradient-to-r from-white via-white/50 to-transparent origin-left"
              />
            </div>
          );
        })}
      </div>

      {/* Radial Items */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {items.map((item, i) => {
          const angle = (i * (360 / items.length)) - 90;
          const radian = (angle * Math.PI) / 180;
          
          return (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            >
              <div 
                className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center text-center"
                style={{
                  transform: `translate(calc(-50% + ${Math.cos(radian) * radius}px), calc(-50% + ${Math.sin(radian) * radius}px))`,
                  width: '180px'
                }}
              >
                {/* Icon Container */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + (i * 0.1), duration: 0.6, ease: "easeOut" }}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md mb-4 pointer-events-auto cursor-default hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[1.5]" />
                </motion.div>

                {/* Label */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1 + (i * 0.1), duration: 0.8 }}
                  className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.2em] font-light leading-tight text-white px-2"
                >
                  {item.label}
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HubDiagram;
