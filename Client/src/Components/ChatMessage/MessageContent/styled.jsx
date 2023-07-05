import YouTube from 'react-player';

export const StyledMessageContent = {
  TextContent: ({ children, ...props }) => (
    <p className=" leading-none" {...props}>
      {children}
    </p>
  ),
  ImageContent: ({ children, ...props }) => (
    <picture className="w-fit overflow-hidden rounded-md">
      <img {...props}></img>
    </picture>
  ),
  YoutubeContent: ({ children, url, ...props }) => (
    <div className=" relative overflow-hidden rounded-md pt-[56.25%]">
      <YouTube
        className=" absolute left-0 top-0 h-full w-full"
        url={url}
        width="100%"
        height="100%"
        playing={false}
        controls={true}
      />
    </div>
  ),
  CoolSayingContent: ({ children, saying, name, ...props }) => (
    <div className=" flex items-center justify-center rounded-md bg-black p-6 text-white">
      <div className=" flex flex-col items-center justify-center gap-2 ">
        <div className="text-lg">
          <span className="select-none font-coolsaying text-3xl">"</span>
          <span className="mx-4 font-coolsaying">{saying}</span>
          <span className="select-none font-coolsaying text-3xl">"</span>
        </div>
        <div className=" font-light text-gray-400">{`${name}, ${new Date().getFullYear()}`}</div>
      </div>
    </div>
  ),
};
