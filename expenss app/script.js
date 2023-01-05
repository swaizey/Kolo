//class of bank

class Bank{
	constructor(firstName, lastName, mail, genNum, balance){
		this.firstName = firstName
		this.lastName = lastName
		this.mail = mail
		this.genNum = genNum
		this.balance = balance
	}

}
class Statement{
	constructor(date, transactId, credit, debit, account, balance){
		this.account = account
		this.balance = balance
		this.credit = credit
		this.debit = debit
		this.date = date
		this.transactId = transactId
	}
}
//Ui class

class UI{
	static showAlert(message, className){
		const div = document.createElement('div')
		div.className = `alert ${className}`
		div.appendChild(document.createTextNode(message))
		const firstName = document.querySelector('.account-details')
		const createAccount =document.body
		createAccount.insertBefore(div, firstName)

		setTimeout(()=>{
			document.querySelector('.alert').remove()
		}, 10000)
	}
	static clearFields(){
		const firstName = document.querySelector('.firstName').value = '',
		  lastName = document.querySelector('.lastName').value = '',
		  mail = document.querySelector('.mail').value = '';
	}
}

//store class

class Store{
	//Get accounts
	static getStatement(){
			let statements
		if(localStorage.getItem('statements') === null){
			statements = []
		}else{
			statements = JSON.parse(localStorage.getItem('statements'))
			
		}
		return statements
	}

		static addStatement(statement){
		const statements = Store.getStatement()
		statements.push(statement)
		localStorage.setItem('statements', JSON.stringify(statements))
		
	}
	static showStatement(account){
		const statements = Store.getStatement()
		statements.forEach((statement) =>{
		if(account === statement.account){
		const accDetai = document.querySelector('.account-details');
		
		accDetai.innerHTML += `
		<ul class='flex statements'>
		<li>${statement.date}</li>
		<li>${statement.transactId}</li>
		<li>${statement.credit}</li>
		<li>${statement.debit}</li>
		<li>${statement.balance}</li>
		</ul>
		`
		}
		})

	}



	static getAccounts(){
		let accounts
		if(localStorage.getItem('accounts') === null){
			accounts = []
		}else{
			accounts = JSON.parse(localStorage.getItem('accounts'))
			
		}
		return accounts
	}

	//Adds accounts
	static addAccount(account){
		const accounts = Store.getAccounts()
		accounts.push(account)
		localStorage.setItem('accounts', JSON.stringify(accounts))
		
	}

	//Gets Single accounts
	static displayAccount(account){
		const accounts = Store.getAccounts()
		accounts.forEach((acc)=>{
			if(acc.genNum == account){
		const accDetai = document.querySelector('.account-details');
		accDetai.innerHTML = `
		<ul>
		<li>First Name: ${acc.firstName}</li>
		<li>Last Name: ${acc.lastName}</li>
		<li>Account: ${acc.genNum}</li>
		<li>Mail: ${acc.mail}</li>
		<li>Balance: ${acc.balance}</li>
		</ul>
		`
			}
		})
	
}
	static deposit(account, amount){
		let balance;
		let credit
		let date = function date(date){
			return[
			date.getDate(),
			date.getMonth(),
			date.getFullYear()
			].join('/')
		}
		let debit
		let transactId

		const accounts = Store.getAccounts()
		const statements = Store.getStatement()
		accounts.forEach((acc)=>{
			if(acc.genNum == account){
			const newBalance = acc.balance += amount
			const statement = new Statement
			(date = date(new Date), transactId = `FT${Math.floor(Math.random() * 4000) * 4000}`,
			 credit = amount, debit = '', account = account, balance = newBalance)
			statements.push(statement)	
			localStorage.setItem('statements', JSON.stringify(statements))
			
			}})
		localStorage.setItem('accounts', JSON.stringify(accounts))
			return accounts
			return statements
	}

		static withdraw(account, amount){
		let balance;
		let credit
		let date
		let debit
		let transactId

		const accounts = Store.getAccounts()
		const statements = Store.getStatement()
		accounts.forEach((acc)=>{
			if(acc.genNum == account){
			const newBalance = acc.balance -= amount
			const statement = new Statement
			(date = new Date(), 
			transactId = `FT${Math.floor(Math.random() * 4000) * 4000}`, 
			credit = '', debit = amount, account = account, balance = newBalance)
			statements.push(statement)	
			localStorage.setItem('statements', JSON.stringify(statements))
				
			}	
		})
		localStorage.setItem('accounts', JSON.stringify(accounts))
		localStorage.setItem('statements', JSON.stringify(statements))
		
			return accounts	
			return statements	
	}}
	


//DOM Elements
const btnCreate = document.body.addEventListener('click', createAccount),
	  btnSearch = document.body.addEventListener('click', searchAccount),
	  btnDeposit = document.body.addEventListener('click', deposit),
	  btnWithGen = document.body.addEventListener('click', searchAccount),
	  btnWithdraw = document.body.addEventListener('click', withdraw),
	  btnCheckBalance = document.body.addEventListener('click', searchAccount),
	  btnStatement = document.body.addEventListener('click', getStatement)
	  
//Search account
	 function searchAccount(e){
	 if(e.target.className === 'btn-gen'){
	 let accounNumber = document.querySelector('.accounNumber').value;
	Store.displayAccount(Number(accounNumber))
	 }


}

	//Make deposite
	function deposit(e){
		let balance;
		let credit
		let date
		let debit
		let transactId
		let account

		if(e.target.className === 'btn-save'){
	let amount = document.querySelector('.amount').value,
	accounNumber =  document.querySelector('.accounNumber').value;
		if(amount === ''|| accounNumber === ''){
			UI.showAlert('Please fill all input', 'danger')
		}else{
			UI.showAlert(`Transaction Successful`, 'success')
			Store.deposit(Number(accounNumber), Number(amount))
			amount = '' 
		accounNumber = ''
		}
		
}}

	//Generate names and account number
function createAccount(e){
	if(e.target.className === 'btn-create'){
			const firstName = document.querySelector('.firstName').value,
		  lastName = document.querySelector('.lastName').value,
		  mail = document.querySelector('.mail').value,
  		  genNum = Math.floor(Math.random() * 400000 + 1) * 10000;
  	let balance = 0


	if(firstName == '' || lastName == '' || mail == ''){
		UI.showAlert('Please fill all fields', 'danger')
	}else{
	const bank = new Bank(firstName, lastName, mail, genNum, balance)
	console.log(bank)
	Store.addAccount(bank)
	UI.showAlert(`Account Opened, your acount number is ${genNum}`, 'success')
	UI.clearFields()
	}}	} 

	function withdraw(e){
	if(e.target.className === 'btn-withdraw'){
	const amount = document.querySelector('#amount').value,
	accounNumber =  document.querySelector('#accounNumber').value;
	if(amount === ''|| accounNumber === ''){
			UI.showAlert('Please fill all input', 'danger')
		}else{
			UI.showAlert(`Transaction Successful`, 'green')
			Store.deposit(Number(accounNumber), Number(amount))}

	}	
}

function getStatement(e){
	if(e.target.className === 'btn-statement'){
		const accountNumber = document.querySelector('.accounNumber').value
		Store.showStatement(Number(accountNumber))

	}
}

