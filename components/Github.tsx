import React from "react";
import {
  BentoGithubGrid,
  GitHubCalendarGridItem,
} from "./ui/GitHubCalendarGridItem";

const Github = () => {
  return (
    <div>
      <BentoGithubGrid>
        <GitHubCalendarGridItem
          id={1}
          title="GitHub Contributions"
          description="See my GitHub activity"
        />
      </BentoGithubGrid>
    </div>
  );
};

export default Github;
