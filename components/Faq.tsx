import { easeIn, motion } from "framer-motion";
import { Add, ArrowRight } from "iconsax-react";
import { useEffect, useRef, useState } from "react";

export default function Faq({
  title,
  description,
  universalClose,
  onChange,
  index,
}: {
  title: string;
  description: string;
  universalClose: number;
  onChange: (index: number) => void;
  index: number;
}) {
  const [show, setShow] = useState(false);
  const paragraph = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    universalClose !== index && setShow(false);
  }, [universalClose, index]);

  const [init, setInit] = useState({
    hide: { height: titleRef.current?.offsetHeight || 0 },
    show: {
      height:
        paragraph.current && titleRef.current
          ? paragraph.current?.offsetHeight +
            titleRef.current?.offsetHeight +
            16
          : "auto",
    },
  });
  useEffect(() => {
    const setInitHandle = () =>
      setInit({
        hide: { height: titleRef.current?.offsetHeight || 64 },
        show: {
          height:
            paragraph.current && titleRef.current
              ? paragraph.current?.offsetHeight +
                titleRef.current?.offsetHeight +
                16
              : "auto",
        },
      });
    setInitHandle();
    window.addEventListener("resize", setInitHandle, true);
    return () => {
      window.removeEventListener("resize", setInitHandle, true);
    };
  }, []);

  return (
    <motion.div
      variants={init}
      initial="hide"
      animate={show ? "show" : "hide"}
      className={`overflow-hidden p-6 pt-0 typo-body bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-800 shadow-xl border-[1px] backdrop-blur-md rounded-lg shadow-lg ${
        show ? "bg-slate-200" : ""
      } dark:bg-slate-800`}
    >
      <div
        onClick={() => {
          onChange(index);
          setShow(!show);
        }}
        className="flex gap-2 items-center py-6 justify-between cursor-pointer text-sm md:text-base font-medium"
        ref={titleRef}
      >
        <h3 className="dark:text-slate-100">{title}</h3>
        <div className="min-w-fit">
          {show ? (
            <Add className="rotate-45" size={24} />
          ) : (
            <ArrowRight size={24} />
          )}
        </div>
      </div>
      <p ref={paragraph} className="text-sm md:text-base dark:text-slate-300">
        {description}
      </p>
    </motion.div>
  );
}
