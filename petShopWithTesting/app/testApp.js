import { Selector } from 'testcafe';

fixture`Haven animals`
  .page`http://localhost:4200/`;

test('home-page testing', async t => {
  const h1 = Selector('h1').count;
  const h2 = Selector('h2').count;
  const btn = Selector('.btn').count;

  await t
    .expect(h1).eql(1)
    .expect(h2).eql(1)
    .expect(btn).eql(2);
});

test('button "add animal" testing', async t => {
  const h1 = Selector('h1').count;
  const btn = Selector('button').count;
  const inputs = Selector('input').count;

  await t
    .click('.add-animal')
    .navigateTo('http://localhost:4200/create')
    .expect(h1).eql(2)
    .expect(btn).eql(1)
    .expect(inputs).eql(8);
});

test('testing create animal Cat', async t => {
  const createForm = Selector('form');
  const li = Selector('li')

  await t
    .click('.add-animal')
    .navigateTo('http://localhost:4200/create')
    .typeText(createForm.child(0).child('input'), 'Рыжик')
    .typeText(createForm.child(1).child('input'), 'Кот')
    .click(createForm.child(2).child(2).child('input'))
    .typeText(createForm.child(3).child('input'), 'рыжий')
    .typeText(createForm.child(4).child('input'), 'Cats')
    .typeText(createForm.child(5).child('input'), '1')
    .typeText(createForm.child(6).child('input'), 'избавлять от стресса')
    .click('button')
    .navigateTo('http://localhost:4200/home')
    .expect(li.child(7).child(0).child(0).textContent).eql('Кот Рыжик');
});

test('testing create animal Rat', async t => {
  const createForm = Selector('form');
  const li = Selector('li')

  await t
    .click('.add-animal')
    .navigateTo('http://localhost:4200/create')
    .typeText(createForm.child(0).child('input'), 'Рик')
    .typeText(createForm.child(1).child('input'), 'Крыса')
    .click(createForm.child(2).child(2).child('input'))
    .typeText(createForm.child(3).child('input'), 'серый')
    .typeText(createForm.child(4).child('input'), 'Murine')
    .typeText(createForm.child(5).child('input'), '1')
    .typeText(createForm.child(6).child('input'), 'бегать в колесе')
    .click('button')
    .navigateTo('http://localhost:4200/home')
    .expect(li.child(8).child(0).child(0).textContent).eql('Крыса Рик');
});

test('testing button hide-cats', async t => {
  const animals = Selector('animals');

  await t
    .expect(animals.child(1).child(0).child(0).child().count).eql(9)
    .click(animals.child(3))
    .expect(animals.child(1).child(0).child(0).child().count).eql(4);
});

test('testing edit-animal-button', async t => {
  const li = Selector('li');
  const editForm = Selector('form');

  await t
    .click(li.child(7).child(0).child(0).child(1).child(0))
    .navigateTo('http://localhost:4200/animal/11')
    .typeText(editForm.child(3).child('input'), 'рыжий в белую полоску')
    .click('button')
    .navigateTo('http://localhost:4200/home')
    .expect(li.child(7).child(0).child(0).textContent).eql('Кот Рыжик');
});

test('testing delete-animal-button ', async t => {
  const li = Selector('li');

  await t
    .setNativeDialogHandler(() => false)
    .click(li.child(7).child(0).child(0).child(1).child(1))
    .expect(li.child(7).child(0).child(0).textContent).eql('Кот Рыжик');
});

test('testing successful delete button', async t => {
  const li = Selector('li');

  await t
    .setNativeDialogHandler(() => true)
    .click(li.child(7).child(0).child(0).child(1).child(1))
    .expect(li.child(7).child(0).child(0).textContent).eql('Крыса Рик');
});
