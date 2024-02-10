const getall = async (setTasks) => {
  try {
    const res = await fetch('http://localhost:5002/todo/');
    const resData = await res.json();
    setTasks(resData)
    return;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

const addnew = async (task, setTasks) => {
  try {
    const res = await fetch('http://localhost:5002/todo/new', {
      method: 'POST',
      body: JSON.stringify({ task: task }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      setTasks((prev) => {
        return [...prev, { task }];
      });
      console.log('Todo added successfully.');
    } else {
      console.error('Failed to add todo.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const updateTask = async (id, editableText, setTasks) => {
  try {
    console.log(id, editableText)
    const res = await fetch('http://localhost:5002/todo/update', {
      method: "PUT",
      body: JSON.stringify({ id: id, task: editableText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task._id === id) {
          return { ...task, task: editableText };
        }
        return task;
      });
    });

  } catch (err) {
    console.log('Error:', err)
  }
}
const deletetask = async (id, setTasks) => {
  try {
    const res = await fetch('http://localhost:5002/todo/delete', {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      setTasks((prev) => {
        return prev.filter(obj => obj._id !== id)
      });
      console.log("Deleted successfully");
    }
  } catch (err) {
    console.log('Error:', err)
  }
}

export { getall, addnew, updateTask, deletetask };