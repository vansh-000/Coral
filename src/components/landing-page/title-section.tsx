import React from "react";

interface TitleSectionProps {
  title: string;
  subheading?: string;
  pill: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subheading,
  pill,
}) => {
  return (
    <React.Fragment>
      <section
        className="flex
        flex-col
        gap-4
        justify-center
        items-center
      "
      >
        <div
          className="rounded-full
          p-[2px]
          text-sm
          md:text-xl
          dark:bg-gradient-to-r
          dark:from-brand-primary-blue
          dark:to-brand-primary-purple
        "
        >
          <div
            className="rounded-full 
            px-3
            py-1
            dark:bg-black"
          >
            {pill}
          </div>
        </div>
        {subheading ? (
          <>
            <h2 className="text-3xl p-1 sm:text-5xl max-w-[750px] text-center font-semibold">
              {title}
            </h2>
            <p className="dark:text-washed-purple-700 sm:max-w-[450px] text-center">
              {subheading}
            </p>
          </>
        ) : (
          <h1 className=" text-center text-4xl sm:text-6xl sm:max-w-[850px] p-1 md:text-center font-semibold">
            {title}
          </h1>
        )}
      </section>
    </React.Fragment>
  );
};

export default TitleSection;
