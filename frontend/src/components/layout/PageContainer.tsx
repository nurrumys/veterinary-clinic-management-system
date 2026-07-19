import type { ReactNode } from "react";


type PageContainerProps = {
  children: ReactNode;
};


function PageContainer({
  children,
}: PageContainerProps) {

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1280px]
      "
    >
      {children}
    </div>
  );
}


export default PageContainer;