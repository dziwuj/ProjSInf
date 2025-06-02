import { type FC, type FormEvent, useEffect, useState } from "react";
import CameraIcon from "@assets/icons/camera-solid.svg?react";
import ShirtIcon from "@assets/icons/shirt-solid.svg?react";
import { useLocation, useNavigate } from "react-router-dom";

import { Image } from "@/components";
import mockCategoryData from "@/constants/mockCategoryData.json";
import { useStore } from "@/store/Root.store";
import type { Clothes } from "@/types/store/ClothesStore";
import { openFilePicker } from "@/utils/openFilePicker";

import styles from "@styles/screens/AddClothing.module.scss";

export const AddClothing: FC = () => {
  const navigate = useNavigate();
  const { clothes, getClothesByID, setClothes } = useStore().clothes;
  const location = useLocation();
  const elementId = location.state?.id;
  const existingElement = getClothesByID(elementId) || ({} as Clothes);

  // Extract form field properties to separate state variables
  const [name, setName] = useState(existingElement.name || "");
  const [description, setDescription] = useState(
    existingElement.description || "",
  );
  const [tags, setTags] = useState<string[]>(existingElement.tags || []);
  const [image, setImage] = useState(existingElement.image || "");

  // Keep editedElement for other properties
  const [editedElement, setEditedElement] = useState<Clothes>(existingElement);

  // Sync the separate state with editedElement when needed
  useEffect(() => {
    setEditedElement(prev => ({
      ...prev,
      name: name,
      description: description,
      tags: tags,
      image: image,
    }));
  }, [name, description, tags, image, setEditedElement]);

  const handleAddPhoto = async () => {
    try {
      const base64 = await openFilePicker({});
      setImage(base64);
    } catch (error) {
      console.error("Failed to get image from gallery:", error);
    }
  };

  const handleAutoComplete = async () => {
    // If there's no element yet, create one based on mock data
    const mockItem = mockCategoryData["T-shirts"][0];

    if (clothes.length > 0) {
      alert("There were an error, please try again later!");
      return;
    }

    try {
      const base64 = await openFilePicker({});
      setImage(base64);
    } catch (error) {
      console.error("Failed to get image from gallery:", error);
      return;
    }

    setTimeout(() => {
      // Set the extracted properties
      setName(mockItem.name);
      setDescription(mockItem.description);
      setTags(mockItem.tags);
      setImage(mockItem.image);

      const newElement: Clothes = {
        id: mockItem.id,
        name: mockItem.name,
        description: mockItem.description,
        tags: mockItem.tags,
        image: mockItem.image,
      };

      setEditedElement(newElement);
    }, 3000);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (editedElement.image === undefined) {
      alert("Provide all data (including photo)!");
      return;
    }
    if (editedElement) {
      // Make sure editedElement has the latest form values
      const updatedElement = {
        ...editedElement,
        name,
        description,
        tags,
      };

      if (elementId) {
        // Update existing
        setClothes(
          clothes.map(item =>
            item.id === updatedElement.id ? updatedElement : item,
          ),
        );
      } else {
        // Add new
        setClothes([...clothes, updatedElement]);
      }
      navigate("/wardrobe");
    }
  };

  return (
    <div className={styles.clothing}>
      <div className={styles.clothingHeader}>
        {image ? (
          <div className={styles.clothingHeaderImageContainer}>
            <Image
              src={image}
              alt="Clothes image"
              className={styles.clothingHeaderImage}
            />
          </div>
        ) : (
          <ShirtIcon className={styles.clothingHeaderIcon} />
        )}
        <div className={styles.clothingHeaderText}>
          <h1 className={styles.clothingHeaderTitle}>
            {elementId ? "Edit clothing" : "New clothing"}
          </h1>
          <div
            className={styles.clothingHeaderCategory}
            onClick={handleAddPhoto}>
            <span className={styles.clothingHeaderSubtitle}>Upload photo</span>
            <CameraIcon className={styles.clothingHeaderCamera} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Black shirt"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <input
            type="text"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Basic black shirt"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Tags</label>
          <input
            type="text"
            required
            value={tags.join(", ")}
            onChange={e =>
              setTags(e.target.value.split(",").map(tag => tag.trim()))
            }
            placeholder="Add tag"
          />
        </div>

        <div onClick={handleAutoComplete} className={styles.autoCompleteButton}>
          <span>Autocomplete</span>
          <CameraIcon className={styles.autoCompleteIcon} />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => navigate("/wardrobe")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
