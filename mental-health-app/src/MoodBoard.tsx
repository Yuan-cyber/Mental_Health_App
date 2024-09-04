import React, { useState } from "react";

// Define the allowed tags
type Tag = "Happiness" | "Anger" | "Depression" | "Peace";

// Define the structure of a MoodListItem according to your specification
type MoodListItem = {
  id: number;
  tag: Tag;
  topic: string;
  description: string;
  date: string; // Assuming date is received as a string from the backend
};

interface MoodPackState {
  moodList: MoodListItem[];
  selectedTag: Tag | null;
}

export const MoodBoard: React.FC = () => {
  const [state, setState] = useState<MoodPackState>({
    moodList: [],
    selectedTag: null,
  });

  const fetchMoodList = async (selectedTag: Tag) => {
    try {
      const response = await fetch(`http://localhost:8080/moodpack`, {});
      setState((prevState) => ({
        ...prevState,
        moodList: response.data,
        selectedTag: selectedTag,
      }));
    } catch (error) {
      console.error("There was an error fetching the mood list:", error);
      // Handle the error properly in a real app
    }
  };
  const renderMoodList = () => {
    return state.moodList.map((item) => (
      <div key={item.id}>
        <span>{item.topic}</span>
        <span>{item.date}</span>
        <p>{item.description}</p>
        <button
          onClick={() => {
            /* handle read more action */
          }}
        >
          Read more
        </button>
      </div>
    ));
  };
  return (
    <div>
      <h1>My Mood Packs</h1>
      <div>
        {(["Happiness", "Anger", "Depression", "Peace"] as Tag[]).map((tag) => (
          <button key={tag} onClick={() => fetchMoodList(tag)}>
            {tag}
          </button>
        ))}
      </div>
      {state.selectedTag && renderMoodList()}
    </div>
  );
};
