import { useState, useMemo } from 'react';
import { Column, ID, Task } from '../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  column: Column;
  tasks: Task[];
  deleteColumn: (id: ID) => void;
  updateColumnTitle: (id: ID, title: string) => void;
  createTask: (columnId: ID) => void;
}

function ColumnContainer({
  column,
  tasks,
  deleteColumn,
  updateColumnTitle,
  createTask,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: column.id, data: { type: 'Column', column } });

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} key={column.id} className='column'>
      {/* Column Title Container -- Header */}
      <div className='columnTitleContainer' {...attributes} {...listeners}>
        <div
          className='columnTitle'
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <div className='columnTitleCount'>0</div>
          {!isEditing && column.title}
          {isEditing && (
            <input
              className='columnTitleInput'
              // value={column.title}
              onChange={(e) => {
                updateColumnTitle(column.id, e.target.value);
              }}
              autoFocus
              onBlur={() => {
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setIsEditing(false);
              }}
            />
          )}
        </div>
        <div
          className='columnDelete'
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <TrashIcon />
        </div>
      </div>
      <div className='columnContentContainer'></div>
      <button>
        <PlusIcon />
      </button>
      <div className='columnFooterContainer'>Footer</div>
    </div>
  );
}

export default ColumnContainer;
