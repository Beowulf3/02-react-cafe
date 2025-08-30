import { useState } from "react";
import css from './App.module.css'
import type { VoteType, Votes } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import CafeInfo from "../CafeInfo/CafeInfo";

function App() {
  const defaultVotes: Votes = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  const [votes, setVotes] = useState<Votes>(defaultVotes);

  const handleVote = (type: VoteType): void => {
    setVotes((votes)=>({
      ...votes,
      [type]: votes[type] + 1,
    }));
  }

  const resetVotes = (): void => {
    setVotes(defaultVotes)
  }
  
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const canReset = totalVotes > 0;

  return (
    <div className={css.app}>
      <CafeInfo/>
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset}
        Reset={true}
      />
      {totalVotes > 0 ?
        <VoteStats
        votes={votes}
        totalVotes={totalVotes}
        positiveRate={totalVotes ? Math.round((votes.good / totalVotes * 100)) : 0}
        /> :
        <Notification />
      }
    </div>
  )
}

export default App
