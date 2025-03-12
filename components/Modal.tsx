import { modal } from "../utils/types";
import { Dialog, Transition } from "@headlessui/react";
import { Add } from "iconsax-react";
import { Fragment } from "react";
export default function Modal({
  title,
  children,
  isOpen,
  closeModal,
  maxWidth,
}: modal) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0  z-50 bg-[#363947]/40`}
            aria-hidden="true"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-10"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-10"
        >
          <div className="fixed  inset-0 z-50 flex items-center justify-center">
            <div className="flex items-center justify-center p-4 w-full">
              <Dialog.Panel
                className="bg-white rounded-xl overflow-hidden p-2 w-full flex flex-col max-h-[calc(100vh_-_64px)] shadow-xl"
                style={{
                  maxWidth,
                }}
              >
                <Dialog.Title>
                  <div className="flex items-center pb-4">
                    <span className="flex-1 text-xl font-bold">{title}</span>
                    <button onClick={closeModal}>
                      <Add size="32" className="rotate-45" />
                    </button>
                  </div>
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
