export interface TagSelectProps {
  predefinedTags: string[];
  selectedTags?: string[];
  setSelectedTags: (tags: string[]) => void;
}
