import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { FC } from "react";
import Image from "next/image";

type Props = {
  code: string;
  name: string;
};

export const LanguageButton: FC<Props> = ({ code, name }) => {
  return (
    <SignUpButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
      <Button size="lg" variant="ghost" className="w-full">
        <Image
          src={code}
          alt={name}
          height={32}
          width={40}
          className="mr-4 rounded-md"
        />
        {name}
      </Button>
    </SignUpButton>
  );
};
