import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { FC } from "react";
import { useKey, useMedia } from "react-use";

type Props = {
  disabled?: boolean;
  lessonId?: number;
  status: "correct" | "wrong" | "none" | "completed";
  onCheck: () => void;
};

export const Footer: FC<Props> = ({ disabled, lessonId, status, onCheck }) => {
  const isMobile = useMedia("(max-width: 1024px)");

  useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        "lg:h-32 h-24 border-t-2",
        status === "correct" && "border-transparent bg-emerald-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-6xl h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-emerald-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircleIcon className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Muito bem! Resposta correta.
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircleIcon className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Resposta incorreta. Tente novamente.
          </div>
        )}
        {status === "completed" && (
          <Button
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/lesson${lessonId}`)}
          >
            Repetir lição
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Verificar"}
          {status === "wrong" && "Tentar novamente"}
          {status === "correct" && "Próximo"}
          {status === "completed" && "Continuar"}
        </Button>
      </div>
    </footer>
  );
};
