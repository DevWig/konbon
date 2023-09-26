import { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';

import { Task } from '../types';

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className='taskCardContainer'>
        <textarea className='taskCardContentInput' />
      </div>
    );
  }

  return (
    <div className='taskCardContainer task'>
      <p className='taskCardContent'>{task.content}</p>
      <button className='taskCardDeleteBtn'>
        <TrashIcon />
      </button>
    </div>
  );
}

export default TaskCard;
