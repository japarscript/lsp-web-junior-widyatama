/* Aplikasi todolist sederhana, menggunakan array dan foreach */

let tasks = [];

function addTask() {
    // Ambil nilai dari input taskInput dan simpan ke dalam variabel tasks
    const taskText = $('#taskInput').val(); 

    // Jika taskText tidak kosong, tambahkan ke dalam array tasks
    if (taskText.trim() !== '') {
        // Simpan data ke dalam array tasks
        tasks.push({
            id: Date.now(), //Id task unik menggunakan Date.now()
            text: taskText,
            completed: false //Status tugas, default false
        });
        
        // Kosongkan input taskInput
        $('#taskInput').val('');
        
        // Tampilkan daftar tugas
        renderTasks();
    }
}

function renderTasks() {
    // Kosongkan dulu, jika ada tugas
    $('#taskList').empty();

    // Filter ketika sudah terpilih, ambil apa yang terpilih
    const filter = $('input[name="filter"]:checked').val();

    let filteredTasks = tasks;
    if (filter === 'pending') {
        // Filter tugas yang belum selesai
        filteredTasks = tasks.filter(task => !task.completed); 
    } else if (filter === 'completed') {
        // Filter tugas yang sudah selesai
        filteredTasks = tasks.filter(task => task.completed);
    }

    // Lalu loop dengan Foreach ke tasks 
    filteredTasks.forEach(task => {
        $('#taskList').append(`<div class="task-item">
            <span><input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}> ${task.text}</span>
            <button type="button" class="btn btn-danger btn-sm float-right delete-task" data-task-id="${task.id}">Hapus</button>
        </div>`);
    });
}

// List event listener
$('#addTaskBtn').on('click', addTask);

// Filter event listener
$('input[name="filter"]').on('change', renderTasks);

// Checkbox event listener
$('#taskList').on('change', 'input[type="checkbox"]', function() {
    const taskId = $(this).attr('id').split('-')[1];
    const task = tasks.find(task => task.id == taskId);
    task.completed = $(this).is(':checked');
    renderTasks();
});

// Delete event listener
$('#taskList').on('click', '.delete-task', function() {
    const taskId = $(this).data('task-id');
    tasks = tasks.filter(task => task.id != taskId);
    renderTasks();
});


        
        
        
        