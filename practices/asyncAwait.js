
class DelayException {
  constructor (txt) {
    this.message = txt
    this.type = 'DELAY_EXCEPTION'
  }

  getMessage() {
    return `[${this.type}] ${this.message}`
  }

  getType () {
    return this.type
  }
}



const delay = (ms, step, isFailed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isFailed ? reject(new DelayException('falló en ' + step)) : resolve('');
    }, ms);
  });
};

const FAILED = true;

const run = async () => {
  try {
    await delay(500, 1, FAILED);
    await delay(500, 2);
    await delay(500, 3);
    await delay(500, 4);
    const result = await delay(500, 5);
    console.log(result);
  } catch (err) {
    switch(err.getType()) {
      case 'DELAY_EXCEPTION':
        console.log('Hubo un error con el delay')
        return;
    }
  } finally {
    console.log('El programa ha finalizado');
  }
};

run();
