import { useEffect, useState } from "react";
import type { FC } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { type TagSelectProps } from "@/types/components/TagSelect";

import { Tag } from "./Tag";

import styles from "@styles/components/TagSelect.module.scss";

export const TagSelect: FC<TagSelectProps> = ({
  predefinedTags,
  setSelectedTags,
  selectedTags = [],
}) => {
  const [tags, setTags] = useState<string[]>(selectedTags);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(predefinedTags);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [inputRef, clickedOutside, resetClickedOutside] =
    useClickOutside<HTMLDivElement>();

  // Add this effect to sync with selectedTags from props when they change
  useEffect(() => {
    setTags(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (clickedOutside && showSuggestions) {
      setShowSuggestions(false);
      resetClickedOutside();
    }
  }, [clickedOutside, showSuggestions, resetClickedOutside]);

  useEffect(() => {
    setSelectedTags(tags);
  }, [tags, setSelectedTags]);

  useEffect(() => {
    setSuggestions(predefinedTags.filter(tag => !tags.includes(tag)));
  }, [predefinedTags, tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredSuggestions = predefinedTags.filter(
        tag =>
          tag.toLowerCase().startsWith(value.toLowerCase()) &&
          !tags.includes(tag),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(predefinedTags.filter(tag => !tags.includes(tag)));
    }
  };

  const handleAddTag = (tag: string) => {
    setShowSuggestions(false);
    if (!tags.includes(tag)) {
      setTags(prev => [...prev, tag]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
    setSuggestions(prev => [...prev, tag]);
  };

  return (
    <div ref={inputRef} className={styles.tagSelectContainer}>
      {tags.map(tag => (
        <Tag key={tag} text={`#${tag}`} onRemove={() => handleRemoveTag(tag)} />
      ))}
      <div className={styles.tagSelectInputContainer}>
        <input
          id="tags"
          name="tags"
          className={styles.tagSelectInput}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Type to search tags..."
        />

        {showSuggestions && (
          <ul className={styles.suggestionsList}>
            <>
              {suggestions.length > 0 &&
                suggestions.slice(0, 3).map(suggestion => (
                  <li
                    key={suggestion}
                    onClick={() => handleAddTag(suggestion)}
                    className={styles.suggestionsItem}>
                    {suggestion}
                  </li>
                ))}
              {!tags.includes(inputValue) &&
              !suggestions.includes(inputValue) &&
              inputValue ? (
                <li
                  className={styles.suggestionsItem}
                  onClick={() => handleAddTag(inputValue)}>
                  Add "{inputValue}"
                </li>
              ) : (
                suggestions.length > 3 && (
                  <li
                    key={suggestions[4]}
                    onClick={() => handleAddTag(suggestions[4])}
                    className={styles.suggestionsItem}>
                    {suggestions[4]}
                  </li>
                )
              )}
            </>
          </ul>
        )}
      </div>
    </div>
  );
};
