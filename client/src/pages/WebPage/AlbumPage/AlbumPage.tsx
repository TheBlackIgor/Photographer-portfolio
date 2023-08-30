import { getFiles, getFolder, getFolders } from "@/api";
import { BackgroundImage } from "@/components";
import { apiUrl } from "@/constant";
import { HeaderDocumentI, PhotoI, SectionI } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StackGrid from "react-stack-grid";

import "./AlbumPage.scss";
import { getImagePath } from "@/utils";

export const AlbumPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState<PhotoI[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<SectionI[]>([]);
  const [titleImage, setTitleImage] = useState("");

  const [countLoaded, setCountLoaded] = useState(0);

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
      setTitle(header.title);
      setDescription(header.description);
      setSections(header.sections);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLoadPicture = () => {
    setCountLoaded(prev => prev + 1);
    // if(countLoaded===images.length-1)
    console.log(countLoaded);
  };

  console.log(images);

  return (
    <>
      <BackgroundImage src={`${apiUrl}/api/image/${params.name}/${titleImage}`}>
        <div className="album-title">
          <h1>{title}</h1>
          <article>{description}</article>
        </div>
      </BackgroundImage>
      <div className="album-sections">
        {sections.map((section, index) => (
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
      <StackGrid columnWidth={300}>
        {images.map(image => (
          <img
            key={image._id}
            src={getImagePath(image, "thumb")}
            onLoad={handleLoadPicture}
          />
        ))}
      </StackGrid>
    </>
  );
};
