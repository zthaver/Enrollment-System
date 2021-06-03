
//generate username function
// takes in entered firstname and lastname to create a unique username for the user
export function generateUsername(firstName, lastName){
    const users = ['jDuke', 'mBhuglah', 'kSidhu'];
    let number = 0;

    firstName = firstName.toLowerCase();

    //capitalize letter of last name
    let lastNameFirstLetter = lastName.charAt(0).toUpperCase();
    let lastNameNoFirstLetter = lastName.slice(1);
    lastName = lastNameFirstLetter.concat(lastNameNoFirstLetter) ;


    console.log(lastName);

    //create Username
    let userName = firstName.charAt(0) + lastName;

    for(let i = 0; i < users.length; i++){
        if(userName === users[i]){
            number++;
            number = number.toString();
            userName = userName.concat(number);
        }
    }

    alert(`Username is ${userName}`);
}