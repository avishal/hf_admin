const category = [
    {
        name: 'Danger',
        value: 'bg-danger'
    },
    {
        name: 'Success',
        value: 'bg-success'
    },
    {
        name: 'Primary',
        value: 'bg-primary'
    },
    {
        name: 'Info',
        value: 'bg-info'
    },
    {
        name: 'Dark',
        value: 'bg-dark'
    },
    {
        name: 'Warning',
        value: 'bg-warning'
    },
];

const calendarEvents = [
    {
        id: 1,
        title: 'Meeting',
        start: new Date().setDate(new Date().getDate() + 1),
        end: new Date().setDate(new Date().getDate() + 2),
        className: 'bg-warning',
    },
    {
        id: 2,
        title: 'Lunch',
        start: new Date(),
        end: new Date(),
        className: 'bg-success',
    },
    {
        id: 3,
        title: 'Birthday - party',
        start: new Date().setDate(new Date().getDate() + 8),
        className: 'bg-info',
    },
    {
        id: 4,
        title: 'Long Event',
        start: new Date().setDate(new Date().getDate() + 7),
        end: new Date().setDate(new Date().getDate() + 8),
        className: 'bg-primary'
    }
];

export { category, calendarEvents };
