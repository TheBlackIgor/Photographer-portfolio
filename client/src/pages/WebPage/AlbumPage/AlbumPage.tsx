import { getFiles, getFolder, getFolders } from "@/api";
import { BackgroundImage, Loader, Spacer } from "@/components";
import { apiUrl } from "@/constant";
import { HeaderDocumentI, PhotoI, SectionI } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StackGrid from "react-stack-grid";
import ImageViewer from "react-simple-image-viewer";

import "./AlbumPage.scss";
import { getImagePath } from "@/utils";
import { useTheme } from "@/theme";

export const AlbumPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [header, setHeader] = useState<HeaderDocumentI>({
    title: "",
    description: "",
    sections: [],
    id: "",
    _id: "",
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<PhotoI[]>([]);
  const [titleImage, setTitleImage] = useState("");
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  const [countLoaded, setCountLoaded] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const getData = async () => {
    if (params.name) {
      const folders = await getFolders();
      const thisFolder = folders.find(folder => folder.name === params.name);
      if (!thisFolder) navigate("/gallery");
      const data = await getFolder(params.name);
      setTitleImage(thisFolder!.image);
      const header: HeaderDocumentI = data.find(
        document => document.id === "index"
      );
      setImages(await getFiles(params.name));
      setHeader(header);
    }
  };

  useEffect(() => {
    getData();
    addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
  }, []);

  useMemo(() => {
    if (countLoaded >= images.length && images.length > 0) setLoading(false);
  }, [countLoaded]);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const handleLoadPicture = () => setCountLoaded(prev => prev + 1);
  return (
    <>
      {loading && <Loader message="Na fajne zdjęcia musisz chwilę poczekać" />}
      {isViewerOpen && (
        <div className="album-imageViewer">
          <ImageViewer
            src={images.map(image => getImagePath(image))}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: theme.theme.cover.seeThroughtDark,
            }}
          />
        </div>
      )}
      {titleImage && (
        <BackgroundImage
          src={`${apiUrl}/api/image/${params.name}/${titleImage}`}
        >
          <div className="album-title">
            <h1>{header!.title}</h1>
            <article>{header!.description}</article>
          </div>
        </BackgroundImage>
      )}
      <div className="album-sections">
        {header!.sections.map((section, index) => (
          <div key={index} className="album-section">
            {index % 2 === 0 ? (
              <>
                <img
                  src={`${apiUrl}/api/image/${params.name}/${section.image}`}
                  alt=""
                />
                <div className="album-section-content">
                  <h2>{section.title}</h2>
                  <article>{section.content}</article>
                </div>
              </>
            ) : (
              <>
                <div className="album-section-content">
                  <h2>{section.title}</h2>
                  <article>{section.content}</article>
                </div>
                <img
                  src={`${apiUrl}/api/image/${params.name}/${section.image}`}
                  alt=""
                />
              </>
            )}
          </div>
        ))}
      </div>
      {!header!.sections.length && <div className="album-spacer" />}
      <StackGrid columnWidth={window.innerWidth < 620 ? 150 : 300}>
        {images.map((image, index) => (
          <img
            className="album-image"
            key={image._id}
            src={getImagePath(image, "thumb")}
            onClick={() => openImageViewer(index)}
            onLoad={handleLoadPicture}
          />
        ))}
      </StackGrid>
    </>
  );
};
