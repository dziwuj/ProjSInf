import { type FC, type FormEvent, useEffect, useState } from "react";
import CameraIcon from "@assets/icons/camera-solid.svg?react";
import ShirtIcon from "@assets/icons/shirt-solid.svg?react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Image, TagSelect } from "@/components";
import { BASE_TAG_LIST } from "@/constants/constants";
import mockCategoryData from "@/constants/mockCategoryData.json";
import { useStore } from "@/store/Root.store";
import type { Clothes } from "@/types/store/ClothesStore";
import { openFilePicker } from "@/utils/openFilePicker";

import styles from "@styles/screens/AddClothing.module.scss";

export const AddClothing: FC = () => {
  const navigate = useNavigate();
  const { clothes, getClothesByID, setClothes } = useStore().clothes;
  const location = useLocation();
  const elementId: string = location.state?.id;
  const existingElement =
    getClothesByID(elementId) ||
    ({
      id: Date.now().toString(),
    } as Clothes);

  // Extract form field properties to separate state variables
  const [name, setName] = useState(existingElement.name || "");
  const [description, setDescription] = useState(
    existingElement.description || "",
  );
  const [tags, setTags] = useState<string[]>(existingElement.tags || []);
  const [image, setImage] = useState(existingElement.image || "");

  // Keep editedElement for other properties
  const [editedElement, setEditedElement] = useState<Clothes>(existingElement);

  useEffect(() => {
    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        // Add a bit more delay to ensure keyboard is fully open
        setTimeout(() => {
          // Use a larger offset to ensure element is well above keyboard
          const viewportHeight = window.innerHeight;
          const elementTop = target.getBoundingClientRect().top;
          const elementHeight = target.offsetHeight;
          const keyboardHeight = viewportHeight * 0.4; // Estimate keyboard height as 40% of viewport

          // Calculate position that places element above keyboard with padding
          const desiredPosition =
            viewportHeight - keyboardHeight - elementHeight - 20;

          // Only scroll if element would be hidden by keyboard
          if (elementTop > desiredPosition) {
            // Use window.scrollTo for better performance than scrollIntoView
            const scrollAmount =
              window.scrollY + (elementTop - desiredPosition);
            window.scrollTo({
              top: scrollAmount,
              behavior: "smooth",
            });
          }
        }, 400); // Longer delay to account for keyboard animation
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, []);

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
      const newElement: Clothes = {
        id: mockItem.id,
        name: mockItem.name,
        description: mockItem.description,
        tags: mockItem.tags,
        image: mockItem.image,
      };

      setName(newElement.name);
      setDescription(newElement.description);
      setTags(newElement.tags);
      setImage(newElement.image);
    }, 3000);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (image === "") {
      alert("Provide all data (including photo)!");
      return;
    }

    if (elementId) {
      // Update existing
      setClothes(
        clothes.map(item =>
          item.id === editedElement.id ? editedElement : item,
        ),
      );
    } else {
      setClothes([...clothes, editedElement]);
    }
    setEditedElement({} as Clothes);
    navigate("/wardrobe");
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className={styles.formGroupInput}
            name="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Black shirt"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            className={styles.formGroupInput}
            id="description"
            name="description"
            type="text"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Basic black shirt"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags</label>
          <TagSelect
            selectedTags={tags}
            setSelectedTags={setTags}
            predefinedTags={BASE_TAG_LIST}
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
          <NavLink className={styles.cancelButton} to="/wardrobe">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
};
