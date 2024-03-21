"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";

type Props = {};

export const ExitModal: FC<Props> = ({}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image alt="mascot" src="/mascot_sad.svg" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Espera, não vai ainda!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Você tem certeza que deseja sair?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={close}
            >
              Continue aprendendo
            </Button>
            <Button
              variant="dangerOutline"
              size="lg"
              className="w-full"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              Terminar sessão
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
