import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

type MediaProps = {
  id: string;
  project_id: string;
  sort_id: string;
  type: string;
  url: string;
};

interface PopUpProjectsProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaProps[];
}

// Helper function to extract YouTube ID from URL
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to check if URL is from YouTube
const isYoutubeUrl = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

export function PopUpProjects({ isOpen, onClose, media }: PopUpProjectsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent
        className="max-w-[90%] xl:max-w-[80%] h-[75%] !rounded-none border-none
        py-[50px] p-0 overflow-y-auto bg-[url('/images/menu-img.png')]
        bg-right-top bg-no-repeat scrollbar-popup"
        aria-describedby={undefined}
      >
        {media?.length > 0 ? (
          <div className="flex flex-col">
            {media.map((item, index) => (
              <div
                key={index}
                className="relative w-full"
              >
                {item.type === "image" ? (
                  <div className="w-full h-auto">
                    <Image
                      alt={`media-${index}`}
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.url}`}
                      width={1200}
                      height={800}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                      className=""
                      priority={index === 0}
                    />
                  </div>
                ) : isYoutubeUrl(item.url) ? (
                  // YouTube Embed (maintain aspect ratio)
                  <div className="relative w-full pb-[56.25%] overflow-hidden"> {/* 16:9 aspect ratio */}
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeId(item.url)}?autoplay=${index === 0 ? 1 : 0}&mute=1&loop=1&controls=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                ) : (
                  // Regular Video (maintain aspect ratio)
                  <div className="relative w-full pb-[56.25%] overflow-hidden"> {/* 16:9 aspect ratio */}
                    <video
                      controls
                      autoPlay={index === 0}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute top-0 left-0 w-full full object-cover"
                    >
                      <source
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.url}`}
                        type={`video/${item.url.split(".").pop()}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[24px] sm:text-[48px] text-center font-semibold flex items-center justify-center text-hover">
            No Media Available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
