import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Button from 'react-bootstrap/Button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';

const tasks = [
  { id: '1', content: 'First task' },
  { id: '2', content: 'Second task' },
  { id: '3', content: 'Third task' },
  // { id: '4', content: 'Fourth task' },
  // { id: '5', content: 'Fifth task' },
];

const taskStatus = {

  toDo: {
    name: 'To do',
    items: tasks,
  },
  inProgress: {
    name: 'Doing',
    items: [],
  },
  done: {
    name: 'Done',
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function Board() {
  const { boardName } = useParams();
  const [columns, setColumns] = useState(taskStatus);
  const [toggle, setToggle] = useState(false)
  const [taskInput, setTaskInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(taskInput);

    console.log(columns);

    setToggle(!toggle)
    setTaskInput('')
  }

  return (
    <>
      <div className="py-2 bg-light m-3">
        <p>boardName: {boardName}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '5rem' }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>

                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 250,
                            // minHeight: 500,
                          }}
                        >
                          <div className="add-card">
                            <div onClick={() => setToggle(!toggle)} className='btn d-flex gap-2 ' >

                              <AddIcon style={{ display: toggle ? 'none' : 'block' }} />
                              <span style={{ display: toggle ? 'none' : 'block' }}>Add a card</span>

                            </div>
                            <div style={{ display: !toggle ? 'none' : 'block' }} className="input">
                              <form onSubmit={handleSubmit} action="">
                                <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} className=' input-group' type="text" name="text" />
                                <div className=' d-flex gap-2 align-items-center p-1'>
                                  <Button type='submit' variant="primary" >Add card</Button>
                                  <ClearIcon onClick={() => setToggle(!toggle)} />
                                </div>
                              </form>
                            </div>
                          </div>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >

                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}
