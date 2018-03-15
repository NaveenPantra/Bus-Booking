// Design pattern : MVC

console.log('JS');

let dataController = (() => {
  // let data = new Array([],[],[],[],[],[],[],[],[],[]);
  let avaliable = 18;
  let currentlyBooked = 0, totalBooked = 0;

  // Initially settin up all the data with seats avaliability
  let fillData = (info) => {
    data.forEach((current, index) => {
      data[index].forEach((current,index) => {
        data[this.index][index] = info[this.index][this.index];
      });
    });
  };

  // Finding to Decrease and increase the passed event
  let decOrInc = (event) => {
    let classes = [...event.classList];
    if (classes.indexOf('booking') >= 0) {
      return false;
    } else {
      return true;
    }
  };

  // Updating the avaliable, currentlyBooked, totalBooked
  let updateAvaliable = (event) => {
    if(decOrInc(event)) {
      avaliable++;
      currentlyBooked--;
      totalBooked--;
    } else {
      avaliable--;
      currentlyBooked++;
      totalBooked++;
    }

    console.log(`Avaliable Seats: ${avaliable}`);
    return avaliable;
  };

  // let updateData = (index0, index1) => {
  //   data[index0][index1] = 1;
  //   console.log(`Data after updating: ${data}`);
  // };


  return {
    getData: () => {
      return data;
    },

    fillData: () => {
      return fillData();
    },

    updateAvaliable: (event) => {
      return updateAvaliable(event);
    },

    updateData: (index0, index1) => {
      // updateData(index0, index1);
    },

    getCurrentlyBooked: () => {
        return currentlyBooked;
    },

    setCurrentlyBooked: (count) => {
        currentlyBooked = count;
    },

    getTotalBooked: () => {
        return totalBooked;
    }
  }
})();




let viewController = (() => {

  // Check the seat for currently booked
  let checkSeat = (seat) => {
    seat.classList.toggle(`notBooked`);
    seat.classList.toggle(`booking`);
  };

  //Updating the seats count below destination
  let updateAvaliable = (count) => {
    $('.seats__count').text(String(count));
  };

  //Set the submit button count value
  let setButton = (currentlyBooked) => {
      if (currentlyBooked > 0) {
        document.querySelector('.booking__count').textContent = currentlyBooked;
      } else {
          document.querySelector('.booking__count').textContent = '';
      }
  };

  return {
    checkSeat: (seat) => {
      checkSeat(seat);
    },

    updateAvaliable: (count) => {
      return updateAvaliable(count);
    },

    setButton: (currentlyBooked) => {
        setButton(currentlyBooked);
    }
  }
})();





// Application Controller
let controller = ((data, view) => {

  // Initially it is called to setup all the event listeners form DOM
  let setUPEventListeners = () => {
    // using Jquery for easy event listeners
      // want to call checkSeat fot data manipulation
      let notBooked = document.querySelectorAll('.notBooked');
      notBooked = [...notBooked];
      notBooked.forEach((current) => {
        console.log(current);
        current.addEventListener('click', checkSeat);
      });

      let booking = document.querySelectorAll('.booking');
      booking = [...booking];
      booking.forEach((current) => {
        current.addEventListener('click', checkSeat);
      });

      document.querySelector('.submit').addEventListener('click', bookSeats);
      document.querySelector('.booking__submit').addEventListener('mouseover', setButtonCount);
      document.querySelector('.booking__submit').addEventListener('mouseout', removeButtonCount);
  };

  // Initially it is also called to fill the data with seat avaliability or not.
  let fillData = () => {

  };

  // Checking for the seat that is avaliable or not (i.e booked or notBooked)
  let checkSeat = (event) => {
      console.log(event);
      let classes = [...event.target.classList];
      console.log(classes)
      if (classes.indexOf('booking') > 0 || classes.indexOf('notBooked') > 0) {
          console.log(event);
          let id = event.target.id.split('-');
          let avaliable;
          // chainging the class for the UI
          view.checkSeat(event.target);

          // Converting String values to Int
          id.forEach((current, index) => {
              id[index] = parseInt(current);
          });

          // call dataController and manipulate the data
          avaliable = data.updateAvaliable(event.target);
          data.updateData(id[0], id[1]);

          // Changing the UI on the basis of avaliable data

          view.updateAvaliable(avaliable);
      }

  };


  // Book all the selected seats
  let bookSeats = () => {
    // let booking = document.querySelector('.booking');
    // let booked = document.querySelector('.booked');
    //
    // // Adding and removing the classes
    // booking.classList.add('booked');
    // booked.classList.remove('booking');

    $('.booking').addClass('booked');
    $('.booked').removeClass('booking');
    alert(`Currenly Booked Seats: ${data.getTotalBooked()}`);
    data.setCurrentlyBooked(0);

  };

  // Setting the seat button count when the mouse is hovered and moved out
  let setButtonCount = function() {
    let currentlyBooked = data.getCurrentlyBooked();
    view.setButton(currentlyBooked);
  };

  // Removing Button count
  let removeButtonCount = function () {
    view.setButton('');
  };

  return {
    init: () => {
      setUPEventListeners();
      fillData();
    }
  }





//  Initilizing the button count
})(dataController, viewController);

(() => {
  controller.init();
}

)();
