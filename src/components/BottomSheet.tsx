import * as Dialog from "@radix-ui/react-dialog";
import type { PropsWithChildren } from "react";

const BottomSheet = ({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
} & PropsWithChildren) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-slideUp data-[state=closed]:animate-slideDown fixed right-0 bottom-0 left-0 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white p-4 shadow-xl sm:bottom-1/2 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:translate-y-1/2 sm:rounded-b-2xl">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300 sm:hidden" />
          <div className="flex justify-between">
            <Dialog.Title className="text-lg font-semibold capitalize">
              {title}
            </Dialog.Title>
            <Dialog.Close className="cursor-pointer text-2xl text-gray-500 transition-colors hover:text-gray-700">
              &times;
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BottomSheet;
