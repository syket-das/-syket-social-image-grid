import React, { useRef, useState } from "react";
import styles from "./ImageGrid.module.css";

export interface ImageGridProps {
  images: string[];
  containerClassName?: string;
  mainImageClassName?: string;
  thumbnailClassName?: string;
  moreImagesClassName?: string;
  modalClassName?: string;
  modalImageClassName?: string;
  counterClassName?: string;
  buttonClassName?: string;
  maxThumbnails?: number;
  aspectRatio?: string;
  showCounter?: boolean;
  counterFormat?: (current: number, total: number) => string;
  onImageClick?: (index: number) => void;
  renderCustomButton?: (
    type: "prev" | "next" | "close",
    onClick: () => void,
    disabled?: boolean,
  ) => React.ReactNode;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  containerClassName = "",
  mainImageClassName = "",
  thumbnailClassName = "",
  moreImagesClassName = "",
  modalClassName = "",
  modalImageClassName = "",
  counterClassName = "",
  buttonClassName = "",
  maxThumbnails = 2,
  aspectRatio = "1",
  showCounter = true,
  counterFormat = (current, total) => `${current} of ${total}`,
  onImageClick,
  renderCustomButton,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const modalRef = useRef<HTMLDivElement>(null);

  if (!images.length) return null;

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
    onImageClick?.(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null || selectedImageIndex >= images.length - 1)
      return;
    setSelectedImageIndex(selectedImageIndex + 1);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null || selectedImageIndex <= 0) return;
    setSelectedImageIndex(selectedImageIndex - 1);
  };

  const renderButton = (
    type: "prev" | "next" | "close",
    onClick: () => void,
    disabled?: boolean,
  ) => {
    if (renderCustomButton) {
      return renderCustomButton(type, onClick, disabled);
    }

    const buttonText = {
      prev: "&lt;",
      next: "&gt;",
      close: "×",
    };

    return (
      <button
        className={`${styles.bottomButton} ${buttonClassName}`}
        onClick={onClick}
        disabled={disabled}
        dangerouslySetInnerHTML={{ __html: buttonText[type] }}
      />
    );
  };

  return (
    <>
      <div
        className={`${styles.container} ${containerClassName}`}
        style={{ aspectRatio }}
      >
        <div
          className={`${styles.mainImageContainer} ${mainImageClassName}`}
          onClick={() => handleImagePress(0)}
        >
          <img
            src={images[0] || "https://picsum.photos/400/500"}
            alt="Main"
            className={styles.mainImage}
          />
        </div>

        {images.length > 1 && (
          <div className={styles.overlayContainer}>
            {images.slice(1, maxThumbnails + 1).map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnailContainer} ${thumbnailClassName}`}
                onClick={() => handleImagePress(index + 1)}
              >
                <img
                  src={image || "https://picsum.photos/400/500"}
                  alt={`Thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
            {images.length > maxThumbnails + 1 && (
              <div
                className={`${styles.moreImagesContainer} ${moreImagesClassName}`}
              >
                <span className={styles.moreImagesText}>
                  +{images.length - maxThumbnails - 1}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedImageIndex !== null && (
        <div
          className={`${styles.modalContainer} ${modalClassName}`}
          ref={modalRef}
        >
          <div className={styles.modalContent}>
            <img
              src={
                images[selectedImageIndex] || "https://picsum.photos/400/500"
              }
              alt={`Full ${selectedImageIndex}`}
              className={`${styles.modalImage} ${modalImageClassName}`}
            />
            {showCounter && (
              <span className={`${styles.imageCounter} ${counterClassName}`}>
                {counterFormat(selectedImageIndex + 1, images.length)}
              </span>
            )}
            <div className={styles.bottomControls}>
              {renderButton("prev", handlePrevImage, selectedImageIndex === 0)}
              {renderButton("close", handleCloseModal)}
              {renderButton(
                "next",
                handleNextImage,
                selectedImageIndex === images.length - 1,
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
