import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { CardComponent } from "@/components/CardComponent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  description?: string;
  type: string;
}

interface SharedData {
  userId: {
    username: string;
    email: string;
  };
  hash: string;
  content?: SharedContent[];
}

export default function SharedPage() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [sharedData, setSharedData] = useState<SharedData | null>(null);
  const [content, setContent] = useState<SharedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!shareLink) {
        setError("Invalid share link");
        setIsLoading(false);
        return;
      }

      try {
        // Get shared content directly using the backend endpoint
        const contentResponse = await axios.get(
          `/api/v1/user/brain/shared/${shareLink}`
        );

        if (contentResponse.data?.content && contentResponse.data?.user) {
          // Set the shared data structure
          setSharedData({
            userId: contentResponse.data.user,
            hash: shareLink,
          });

          // Set the actual content
          setContent(contentResponse.data.content);
          toast.success(
            `Loaded ${contentResponse.data.content.length} items from ${contentResponse.data.user.username}'s collection`
          );
        } else {
          setError("Shared content not found");
        }
      } catch (error: unknown) {
        console.error("Error fetching shared data:", error);
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response: { status: number } };
          if (axiosError.response?.status === 404) {
            const errorMsg = "This share link doesn't exist or has been removed.";
            setError(errorMsg);
            toast.error(errorMsg);
          } else {
            const errorMsg =
              "Failed to load shared content. Please try again later.";
            setError(errorMsg);
            toast.error(errorMsg);
          }
        } else {
          const errorMsg =
            "Failed to load shared content. Please try again later.";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Share link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link. Please copy the URL manually.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">
            Loading shared collection...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Content Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-indigo-600 hover:bg-indigo-700"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to MindStack
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="bg-indigo-600 text-white flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0">
                <span className="text-sm sm:text-base font-bold">M</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
                  {sharedData?.userId?.username || "User"}'s MindStack
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Shared knowledge collection
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                size="sm"
                className="hidden sm:flex"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>

              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                size="sm"
                className="sm:hidden"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" asChild size="sm">
                <a href="/" className="flex items-center">
                  <ExternalLink className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Create Your Own</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {content.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📚</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 px-4">
              No Content Yet
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-4 max-w-md mx-auto">
              This collection is empty.{" "}
              <strong>{sharedData?.userId?.username || "The owner"}</strong>{" "}
              hasn't added any content to share yet.
            </p>
            <Button variant="outline" asChild size="sm">
              <a href="/" className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Your Own Collection
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Shared Collection
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {content.length} item{content.length !== 1 ? "s" : ""} in this
                knowledge hub
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-max">
              {content.map((data, index) => {
                // Create different sizes for bento grid effect - simplified for mobile
                const getBentoSize = (index: number) => {
                  const patterns = [
                    "sm:col-span-2 sm:row-span-2", // Large square (only on sm+)
                    "col-span-1 row-span-1", // Regular
                    "sm:col-span-1 sm:row-span-2", // Tall (only on sm+)
                    "sm:col-span-2 sm:row-span-1", // Wide (only on sm+)
                    "col-span-1 row-span-1", // Regular
                    "col-span-1 row-span-1", // Regular
                  ];
                  return patterns[index % patterns.length];
                };

                return (
                  <div key={data._id} className={`${getBentoSize(index)}`}>
                    <CardComponent
                      id={data._id}
                      title={data.title}
                      link={data.link}
                      description={data.description}
                      type={data.type}
                      // No delete function for shared view
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center text-gray-500 text-xs sm:text-sm">
            <p>
              Powered by <strong>MindStack</strong> - Organize and share your
              knowledge
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
