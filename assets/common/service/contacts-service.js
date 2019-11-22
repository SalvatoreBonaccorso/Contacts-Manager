angular.module("contactMsg")

    /* Creazione di un Service personalizzato */
    .factory('contacts', function () {
        var contacts = [{
            name: 'Stephen Radford',
            phone: '0123456789',
            address: '123, Some Street\nLeicester\nLE1 2AB',
            email: 'stephen@email.com',
            website: 'stephenradford.me',
            notes: ''
        },
        {
            name: 'Declan Proud',
            phone: '91234859',
            address: '234, Some Street\nLeicester\nLE1 2AB',
            email: 'declan@declan.com',
            website: 'declanproud.me',
            notes: 'Some notes about the contact.'
        }];

        return {
            /* il metodo get restituisce l'intero array */
            get: function () {
                return contacts;
            },
            /* il metodo find accetta un indice che restituisce il contatto richiesto */
            find: function (index) {
                return contacts[index];
            },
            /* il metodo create aggiunge un nuovo contatto  */
            create: function (contact) {
                contacts.push(contact);
            }
        };
    })