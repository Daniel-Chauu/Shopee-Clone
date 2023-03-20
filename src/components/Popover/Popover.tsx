import { useFloating } from "@floating-ui/react-dom";
import {
  arrow,
  FloatingPortal,
  offset,
  shift,
  type Placement,
} from "@floating-ui/react-dom-interactions";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";

interface PopoverProps {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  initialOpen?: boolean;
  placement?: Placement;
}

const Popover = ({
  children,
  renderPopover,
  initialOpen,
  placement,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const arrowRef = useRef<HTMLElement>(null);
  const id = useId();

  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [offset(5), shift(), arrow({ element: arrowRef })],
    placement: placement,
  });

  const showPopover = () => setIsOpen(true);
  const hidePopover = () => setIsOpen(false);
  return (
    <>
      <div
        className="flex items-center py-1 hover:text-gray-200 transition-all cursor-pointer"
        ref={refs.setReference}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  transformOrigin: `${middlewareData.arrow?.x}px top`,
                }}
                initial={{ opacity: 0, transform: "scale(0)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0)" }}
                transition={{ duration: 0.25 }}
              >
                <span
                  ref={arrowRef}
                  className="border-[11px] border-x-transparent border-t-transparent border-b-white absolute translate-y-[-98%] z-5"
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y,
                  }}
                ></span>
                <div className="absolute w-full h-3 bottom-full"></div>
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </>
  );
};

export default Popover;
