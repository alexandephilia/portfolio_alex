// Import necessary dependencies for animations, UI components, and icons
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, User, Award, Terminal, Mail, Menu, X, Hash, Calculator, ArrowLeftRight, DollarSign, Send, Phone, Handshake, MessageCircle, MessagesSquare, UserRoundPlus, MailCheck, Option } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command";
import { SiMaildotru, SiThreads } from "react-icons/si";

type UnitCategory = 'length' | 'weight' | 'temperature';

interface UnitConversion {
  from: string;
  to: string;
  multiplier?: number;
  formula?: (value: number) => number;
}

const unitConversions: Record<UnitCategory, UnitConversion[]> = {
  length: [
    { from: 'km', to: 'miles', multiplier: 0.621371 },
    { from: 'miles', to: 'km', multiplier: 1.60934 },
    { from: 'm', to: 'ft', multiplier: 3.28084 },
    { from: 'ft', to: 'm', multiplier: 0.3048 },
    { from: 'cm', to: 'inch', multiplier: 0.393701 },
    { from: 'inch', to: 'cm', multiplier: 2.54 },
  ],
  weight: [
    { from: 'kg', to: 'lbs', multiplier: 2.20462 },
    { from: 'lbs', to: 'kg', multiplier: 0.453592 },
    { from: 'g', to: 'oz', multiplier: 0.035274 },
    { from: 'oz', to: 'g', multiplier: 28.3495 },
  ],
  temperature: [
    {
      from: 'c', to: 'f',
      formula: (c) => (c * 9 / 5) + 32
    },
    {
      from: 'f', to: 'c',
      formula: (f) => (f - 32) * 5 / 9
    },
  ],
};

const calculatorExamples = [
  "2 + 2",
  "15% of 80",
  "5 × 3",
  "100 ÷ 4",
  "25% of 200",
  "3 × (4 + 2)",
  "50 + 50",
  "8 × 7",
  "120 - 45",
  "10% of 150"
];

// Add these utility functions at the top
const safeEvaluate = (expression: string): number => {
  // Tokenize the expression
  const tokens = expression.match(/(\d*\.?\d+|[-+*/()])/g) || [];

  // Simple recursive descent parser
  let pos = 0;

  const parseExpression = (): number => {
    let value = parseTerm();

    while (pos < tokens.length) {
      const operator = tokens[pos];
      if (operator !== '+' && operator !== '-') break;
      pos++;
      const nextValue = parseTerm();
      value = operator === '+' ? value + nextValue : value - nextValue;
    }

    return value;
  };

  const parseTerm = (): number => {
    let value = parseNumber();

    while (pos < tokens.length) {
      const operator = tokens[pos];
      if (operator !== '*' && operator !== '/') break;
      pos++;
      const nextValue = parseNumber();
      if (operator === '*') {
        value *= nextValue;
      } else if (operator === '/') {
        if (nextValue === 0) throw new Error('Division by zero');
        value /= nextValue;
      }
    }

    return value;
  };

  const parseNumber = (): number => {
    if (tokens[pos] === '(') {
      pos++;
      const value = parseExpression();
      if (tokens[pos] !== ')') throw new Error('Missing closing parenthesis');
      pos++;
      return value;
    }

    const value = parseFloat(tokens[pos]);
    if (isNaN(value)) throw new Error('Invalid number');
    pos++;
    return value;
  };

  return parseExpression();
};

const converterExamples = [
  "5km to miles",
  "100f to c",
  "2.5kg to lbs",
  "30cm to inch",
  "60miles to km",
  "1000g to oz"
];

type CurrencyCategory = 'currency';

interface CurrencyConversion {
  from: string;
  to: string;
  rate?: number;
}

const currencyExamples = [
  "1,000 usd to eur",
  "50,000 eur to gbp",
  "1,000,000 jpy to usd",
  "2,500 gbp to eur",
  "7,500 aud to usd",
  "500,000 cad to eur",
  "1,000,000 idr to usd",
  "100,000 usd to idr",
  "500,000 idr to eur"
];

// Add this function to fetch exchange rates
const fetchExchangeRate = async (from: string, to: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${from.toUpperCase()}`
    );
    const data = await response.json();
    return data.rates[to.toUpperCase()] || null;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
};

const FloatingMenu = () => {
  // State management for menu open/close and animation states
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingIcons, setIsAnimatingIcons] = useState(false);
  const [iconsHaveFadedOut, setIconsHaveFadedOut] = useState(false);
  const [showCommandDialog, setShowCommandDialog] = useState(false);
  const [isCalculatorMode, setIsCalculatorMode] = useState(false);
  const [calculationResult, setCalculationResult] = useState<string | null>(null);
  const [isConverterMode, setIsConverterMode] = useState(false);
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isCurrencyMode, setIsCurrencyMode] = useState(false);
  const [currencyResult, setCurrencyResult] = useState<string | null>(null);

  // Handle menu close animation sequence
  const handleClose = async () => {
    setIsAnimatingIcons(true);
    await fadeOutIcons();
    setIconsHaveFadedOut(true);
    setIsOpen(false);
    setIsAnimatingIcons(false);
    setIconsHaveFadedOut(false);
  };

  // Helper function to create delay for icon fade out animation
  const fadeOutIcons = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, menuItems.length * 100 + 200);
    });
  };

  const handleCommandSelect = (href: string) => {
    setShowCommandDialog(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  // Update the calculation logic in your component
  const calculateResult = (value: string) => {
    try {
      let cleanInput = value.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/×|x/g, '*')
        .replace(/÷/g, '/');

      // Handle percentage calculations
      if (cleanInput.includes('%') && cleanInput.includes('of')) {
        const parts = cleanInput.split(/of/i);
        if (parts.length === 2) {
          const percentage = parseFloat(parts[0].replace('%', ''));
          const total = parseFloat(parts[1]);
          if (!isNaN(percentage) && !isNaN(total)) {
            const result = (percentage / 100) * total;
            setCalculationResult(formatResult(result));
            return;
          }
        }
      }

      // Handle regular calculations
      cleanInput = cleanInput.replace(/([0-9.]+)%/g, '($1/100)');
      const result = safeEvaluate(cleanInput);
      setCalculationResult(formatResult(result));
    } catch (error) {
      console.error('Calculation error:', error);
      setCalculationResult(null);
    }
  };

  const getRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * calculatorExamples.length);
    return calculatorExamples[randomIndex];
  };

  // Define menu items inside the component
  const menuItems = [
    {
      icon: <Terminal className="h-5 w-5" />,
      label: "Command",
      onClick: () => setShowCommandDialog(true),
      command: true
    },

    {
      icon: <UserRoundPlus className="h-5 w-5" />,
      label: "WhatsApp",
      href: "https://wa.me/6285959300787",
      external: true
    },
    {
      icon: <MailCheck className="h-5 w-5" />,
      label: "Email",
      href: "mailto:0xnihilist@gmail.com",
      external: true
    },
    {
      icon: <Hash className="h-5 w-5" />,
      label: "Twitter",
      href: "https://x.com/0xnihilism",
      external: true
    },
    {
      icon: <X className="h-5 w-5" />,
      label: "Close",
      onClick: handleClose
    },
  ];

  // Calculate menu width based on screen size
  const mobileWidth = menuItems.length * 48 + 16;
  const desktopWidth = menuItems.length * 44;

  // Update the formatResult function
  const formatResult = (result: number, isUnitConversion = false, isCurrency = false): string => {
    if (!Number.isFinite(result)) return null;

    // Handle very small or very large numbers
    if (Math.abs(result) < 0.000001 || Math.abs(result) > 1e21) {
      return result.toExponential(2);
    }

    // For currency formatting
    if (isCurrency) {
      // Format with commas and 3 decimal places
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(result);
    }

    // For regular numbers
    if (Number.isInteger(result)) {
      return new Intl.NumberFormat('en-US').format(result);
    }

    // Different precision for unit conversions vs calculations
    if (isUnitConversion) {
      // Use 3 decimal places for unit conversions
      const fixedResult = result.toFixed(3);
      // Format with commas and remove trailing zeros
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(parseFloat(fixedResult));
    } else {
      // For calculations, use 2 decimal places
      const fixedResult = result.toFixed(2);
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(parseFloat(fixedResult));
    }
  };

  const handleUnitConversion = (input: string): string | null => {
    try {
      const match = input.match(/(\d+\.?\d*)\s*([a-zA-Z]+)\s*(?:to|in)\s*([a-zA-Z]+)/i);
      if (!match) return null;

      const [, valueStr, fromUnit, toUnit] = match;
      const value = parseFloat(valueStr);
      if (isNaN(value)) return null;

      for (const category of Object.keys(unitConversions) as UnitCategory[]) {
        const conversion = unitConversions[category].find(
          c => c.from.toLowerCase() === fromUnit.toLowerCase() &&
            c.to.toLowerCase() === toUnit.toLowerCase()
        );

        if (conversion) {
          const result = conversion.formula
            ? conversion.formula(value)
            : value * conversion.multiplier!;
          return `${formatResult(result, true)} ${toUnit.toLowerCase()}`;
        }
      }
      return null;
    } catch {
      return null;
    }
  };

  // Update the input handler to properly set currency mode
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!value.trim()) {
      setIsConverterMode(false);
      setIsCalculatorMode(false);
      setIsCurrencyMode(false);
      setCalculationResult(null);
      setConversionResult(null);
      setCurrencyResult(null);
      return;
    }

    // Updated currency pattern to handle commas
    const currencyPattern = /([0-9,]+\.?\d*)\s*([a-zA-Z]{3})\s*(?:to|in)\s*([a-zA-Z]{3})/i;
    const isCurrency = currencyPattern.test(value);

    if (isCurrency) {
      // Reset other modes first
      setIsCalculatorMode(false);
      setIsConverterMode(false);
      setCalculationResult(null);
      setConversionResult(null);

      // Set currency mode and handle conversion
      setIsCurrencyMode(true);
      handleCurrencyConversion(value);
    } else {
      // Reset currency mode
      setIsCurrencyMode(false);
      setCurrencyResult(null);

      // Check for unit conversion
      const conversionPattern = /(\d+\.?\d*)\s*([a-zA-Z]+)\s*(?:to|in)\s*([a-zA-Z]+)/i;
      const isConversion = conversionPattern.test(value);

      if (isConversion) {
        setIsConverterMode(true);
        setIsCalculatorMode(false);
        const result = handleUnitConversion(value);
        setConversionResult(result);
        setCalculationResult(null);
      } else {
        // Check for calculator input
        const hasCalculation = /[\d+\-*×x÷/().%]|of/i.test(value);
        if (hasCalculation) {
          setIsConverterMode(false);
          setIsCalculatorMode(true);
          setConversionResult(null);
          calculateResult(value.replace(/\s+/g, ''));
        }
      }
    }
  };

  // Refactor the tool selection handlers into separate functions
  const handleCalculatorExample = () => {
    const example = getRandomExample();
    setInputValue(example);
    setIsCalculatorMode(true);
    setIsConverterMode(false);
    setConversionResult(null);
    calculateResult(example);
  };

  const handleConverterExample = () => {
    const example = converterExamples[Math.floor(Math.random() * converterExamples.length)];
    setInputValue(example);
    setIsConverterMode(true);
    setIsCalculatorMode(false);
    setCalculationResult(null);
    const result = handleUnitConversion(example);
    setConversionResult(result);
  };

  const handleCurrencyExample = () => {
    const example = currencyExamples[Math.floor(Math.random() * currencyExamples.length)];
    setInputValue(example);
    setIsCurrencyMode(true);
    setIsCalculatorMode(false);
    setIsConverterMode(false);
    setCalculationResult(null);
    setConversionResult(null);
    handleCurrencyConversion(example);
  };

  // Update the handleCurrencyConversion function
  const handleCurrencyConversion = async (input: string) => {
    // Updated pattern to handle commas in numbers
    const match = input.match(/([0-9,]+\.?\d*)\s*([a-zA-Z]{3})\s*(?:to|in)\s*([a-zA-Z]{3})/i);
    if (!match) return null;

    const [, valueStr, fromCurrency, toCurrency] = match;
    // Remove commas before parsing
    const value = parseFloat(valueStr.replace(/,/g, ''));

    if (isNaN(value)) return null;

    const rate = await fetchExchangeRate(fromCurrency, toCurrency);
    if (rate) {
      const result = value * rate;
      setCurrencyResult(`${formatResult(result, false, true)} ${toCurrency.toUpperCase()}`);
    } else {
      setCurrencyResult(null);
    }
  };

  useEffect(() => {
    // Add meta viewport tag to prevent zoom
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0';
    document.head.appendChild(metaViewport);

    return () => {
      document.head.removeChild(metaViewport);
    };
  }, []);

  return (
    // Wrap menu in TooltipProvider for hover tooltips
    <TooltipProvider delayDuration={100}>
      <CommandDialog
        open={showCommandDialog}
        onOpenChange={setShowCommandDialog}
      >
        <CommandInput
          placeholder="Type command or calculate..."
          onExternalValueChange={handleInputChange}
          isCalculatorMode={isCalculatorMode}
          isConverterMode={isConverterMode}
          isCurrencyMode={isCurrencyMode}
          value={inputValue}
          autoFocus={false}
          readOnly={true}
          onFocus={(e) => {
            // Prevent zoom on focus
            e.target.setAttribute('readonly', 'true');
            setTimeout(() => {
              e.target.removeAttribute('readonly');
            }, 100);
          }}
        />
        <CommandList>
          <CommandEmpty>
            {isCalculatorMode && calculationResult ? (
              <motion.div
                className="px-3 -my-3 flex items-center gap-2"
                key={calculationResult}
                initial={{ scale: 1, filter: "blur(0px)" }}
                animate={{
                  scale: [1, 1.05, 1],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                  scale: {
                    ease: [0.22, 1, 0.36, 1],
                  },
                  filter: {
                    ease: "easeInOut",
                    delay: 0.1
                  }
                }}
              >
                <Calculator className="h-4 w-4 text-orange-500 animate-pulse" />
                <span className="text-orange-500 font-bold text-base tracking-wider animate-pulse 
                  [text-shadow:0_0_1px_theme(colors.orange.500),0_0_15px_theme(colors.orange.500/40),0_0_30px_theme(colors.orange.500/20)] 
                  [-webkit-text-stroke:0.25px_theme(colors.orange.600/30)]
                  [filter:brightness(1.2)_contrast(1.1)_blur(0.2px)]">
                  = {calculationResult}
                </span>
              </motion.div>
            ) : isConverterMode && conversionResult ? (
              <motion.div
                className="px-3 -my-3 flex items-center gap-2"
                key={conversionResult}
                initial={{ scale: 1, filter: "blur(0px)" }}
                animate={{
                  scale: [1, 1.05, 1],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                  scale: {
                    ease: [0.22, 1, 0.36, 1],
                  },
                  filter: {
                    ease: "easeInOut",
                    delay: 0.1
                  }
                }}
              >
                <ArrowLeftRight className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="text-blue-500 font-bold text-base tracking-wider animate-pulse
                  [text-shadow:0_0_1px_theme(colors.blue.500),0_0_15px_theme(colors.blue.500/40),0_0_30px_theme(colors.blue.500/20)]
                  [-webkit-text-stroke:0.25px_theme(colors.blue.600/30)]
                  [filter:brightness(1.2)_contrast(1.1)_blur(0.2px)]">
                  = {conversionResult}
                </span>
              </motion.div>
            ) : isCurrencyMode && currencyResult ? (
              <motion.div
                className="px-3 -my-3 flex items-center gap-2"
                key={currencyResult}
                initial={{ scale: 1, filter: "blur(0px)" }}
                animate={{
                  scale: [1, 1.05, 1],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                  scale: {
                    ease: [0.22, 1, 0.36, 1],
                  },
                  filter: {
                    ease: "easeInOut",
                    delay: 0.1
                  }
                }}
              >
                <DollarSign className="h-4 w-4 text-green-500 animate-pulse" />
                <span className="text-green-500 font-bold text-base tracking-wider animate-pulse
                  [text-shadow:0_0_1px_theme(colors.green.500),0_0_15px_theme(colors.green.500/40),0_0_30px_theme(colors.green.500/20)]
                  [-webkit-text-stroke:0.25px_theme(colors.green.600/30)]
                  [filter:brightness(1.2)_contrast(1.1)_blur(0.2px)]">
                  = {currencyResult}
                </span>
              </motion.div>
            ) : (
              !isCalculatorMode && !isConverterMode && !isCurrencyMode && (
                <div className="py-6 text-center text-sm">
                  No results found.
                </div>
              )
            )}
          </CommandEmpty>
          <CommandGroup heading="Tools">
            <div className="flex flex-col">
              {/* Calculator Tool - Always first */}
              <CommandItem
                onSelect={handleCalculatorExample}
                className="cursor-none flex items-center gap-2 order-1"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/40">
                  <Calculator className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Calculate</span>
                  <span className="text-xs text-muted-foreground">
                    Basic math and percentage calculations
                  </span>
                </div>
              </CommandItem>

              {/* Calculator Examples */}
              {!inputValue && (
                <div className="px-2 py-1.5 border-b mb-2 order-2">
                  <div className="flex gap-2 items-center text-[10px] text-muted-foreground">
                    <span className="opacity-70">Examples:</span>
                    <div className="flex gap-2">
                      <span className="text-orange-500 [text-shadow:0_0_1px_theme(colors.orange.500),0_0_10px_theme(colors.orange.500/30)] blur-[0.2px] font-medium">
                        2 + 2
                      </span>
                      <span className="opacity-50">·</span>
                      <span className="text-orange-500 [text-shadow:0_0_1px_theme(colors.orange.500),0_0_10px_theme(colors.orange.500/30)] blur-[0.2px] font-medium">
                        15% of 80
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Units Tool - Always second */}
              <CommandItem
                onSelect={handleConverterExample}
                className="cursor-none flex items-center gap-2 order-3"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/40">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Units</span>
                  <span className="text-xs text-muted-foreground">
                    Length, weight, and temperature
                  </span>
                </div>
              </CommandItem>

              {/* Units Examples */}
              {!inputValue && (
                <div className="px-2 py-1.5 border-b mb-2 order-4">
                  <div className="flex gap-2 items-center text-[10px] text-muted-foreground">
                    <span className="opacity-70">Examples:</span>
                    <div className="flex gap-2">
                      <span className="text-blue-500 [text-shadow:0_0_1px_theme(colors.blue.500),0_0_10px_theme(colors.blue.500/30)] blur-[0.2px] font-medium">
                        5km to miles
                      </span>
                      <span className="opacity-50">·</span>
                      <span className="text-blue-500 [text-shadow:0_0_1px_theme(colors.blue.500),0_0_10px_theme(colors.blue.500/30)] blur-[0.2px] font-medium">
                        100f to c
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Currency Tool - Always third */}
              <CommandItem
                onSelect={handleCurrencyExample}
                className="cursor-none flex items-center gap-2 order-5"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/40">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Currency</span>
                  <span className="text-xs text-muted-foreground">
                    Real-time exchange rates
                  </span>
                </div>
              </CommandItem>

              {/* Currency Examples */}
              {!inputValue && (
                <div className="px-2 py-1.5 order-6">
                  <div className="flex gap-2 items-center text-[10px] text-muted-foreground">
                    <span className="opacity-70">Examples:</span>
                    <div className="flex gap-2">
                      <span className="text-green-500 [text-shadow:0_0_1px_theme(colors.green.500),0_0_10px_theme(colors.green.500/30)] blur-[0.2px] font-medium">
                        1,000 usd to eur
                      </span>
                      <span className="opacity-50">·</span>
                      <span className="text-green-500 [text-shadow:0_0_1px_theme(colors.green.500),0_0_10px_theme(colors.green.500/30)] blur-[0.2px] font-medium">
                        1,000,000 jpy to usd
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Fixed positioning for floating menu */}
      <div className="fixed bottom-20 sm:bottom-20 left-1/2 -translate-x-1/2 z-50">
        {/* Container for menu animations */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={false}
          data-magnetic="true"
        >
          {/* Animated menu background */}
          <motion.div
            className={cn(
              "absolute left-1/2 shadow-lg border border-border/50 transition-colors duration-300",
              "bg-background/30 backdrop-blur-md"
            )}
            animate={{
              width: isOpen
                ? `clamp(${desktopWidth}px, ${mobileWidth}px, ${mobileWidth}px)`
                : 56,
              height: 56,
              x: "-50%",
              borderRadius: 45,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1.2,
              duration: 0.8,
              delay: iconsHaveFadedOut ? 0 : 0.4 // Delay menu unexpand until icons fade out completely
            }}
          >
            {/* Animated menu items container */}
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center px-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: iconsHaveFadedOut ? 0.3 : 0.5
                    }
                  }}
                >
                  {/* Menu items layout */}
                  <div className="flex items-center justify-center gap-2.5">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          scale: 0.5,
                          opacity: 0,
                          y: -20,
                          filter: "blur(8px)"
                        }}
                        animate={{
                          scale: 1.1,
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.4,
                            ease: [0.68, -0.55, 0.27, 1.55],
                            delay: 0.5 + (index * 0.1)
                          }
                        }}
                        exit={{
                          scale: 0.5,
                          opacity: 0,
                          y: -20,
                          filter: "blur(8px)",
                          transition: {
                            duration: 0.2,
                            ease: [0.68, -0.55, 0.27, 1.55],
                            delay: index * 0.1
                          }
                        }}
                      >
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-10 w-10 rounded-full hover:bg-accent/20 hover:blur-[1px] active:scale-95 transition-all duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (item.onClick) {
                                  item.onClick();
                                } else if (item.href) {
                                  window.open(item.href, item.external ? "_blank" : undefined);
                                }
                              }}
                            >
                              {item.icon}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-transparent border-none shadow-none hidden sm:block"
                            sideOffset={5}
                          >
                            <span className="font-medium">{item.label}</span>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu trigger button animation */}
            <AnimatePresence mode="wait">
              {!isOpen && (
                <motion.div
                  key="menu"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.4 } }}
                  exit={{ opacity: 0 }}
                >
                  {/* Menu trigger button with tooltip */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-[56px] w-[56px] rounded-full hover:bg-accent/20 active:scale-95 transition-all duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsOpen(true);
                        }}
                      >
                        <Menu className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-transparent border-none shadow-none hidden sm:block"
                      sideOffset={5}
                    >
                      <span className="font-medium">Menu</span>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default FloatingMenu;
