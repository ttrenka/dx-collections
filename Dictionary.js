define(["./main"], function(main){
	var Dictionary=function(dictionary){
		//	summary
		//	Returns an object of type Dictionary
		var items={};
		this.count=0;

		//	comparator for property addition and access.
		var testObject={};

		this.add=function(/* string */k, /* object */v){
			//	summary
			//	Add a new item to the Dictionary.
			var b=(k in items);
			items[k]=new main.DictionaryEntry(k,v);
			if(!b){
				this.count++;
			}
		};
		this.clear=function(){
			//	summary
			//	Clears the internal dictionary.
			items={};
			this.count=0;
		};
		this.clone=function(){
			//	summary
			//	Returns a new instance of Dictionary; note the the dictionary is a clone but items might not be.
			return new Dictionary(this);	//	Dictionary
		};
		this.contains=this.containsKey=function(/* string */k){
			//	summary
			//	Check to see if the dictionary has an entry at key "k".
			if(testObject[k]){
				return false;			// bool
			}
			return (items[k]!=null);	//	bool
		};
		this.containsValue=function(/* object */v){
			//	summary
			//	Check to see if the dictionary has an entry with value "v".
			var e=this.getIterator();
			while(e.get()){
				if(e.element.value==v){
					return true;	//	bool
				}
			}
			return false;	//	bool
		};
		this.entry=function(/* string */k){
			//	summary
			//	Accessor method; similar to Dictionary.item but returns the actual Entry object.
			return items[k];	//	DictionaryEntry
		};
		this.forEach=function(/* function */ fn, /* object? */ scope){
			//	summary
			//	functional iterator, following the mozilla spec.
			var a=[];	//	Create an indexing array
			for(var p in items) {
				if(!testObject[p]){
					a.push(items[p]);	//	fill it up
				}
			}
			main.forEach.call(a, fn, scope);
		};
		this.getKeyList=function(){
			//	summary
			//	Returns an array of the keys in the dictionary.
			return (this.getIterator()).map(function(entry){
				return entry.key;
			});	//	array
		};
		this.getValueList=function(){
			//	summary
			//	Returns an array of the values in the dictionary.
			return (this.getIterator()).map(function(entry){
				return entry.value;
			});	//	array
		};
		this.item=function(/* string */k){
			//	summary
			//	Accessor method.
			if(k in items){
				return items[k].valueOf();	//	object
			}
			return undefined;	//	object
		};
		this.getIterator=function(){
			//	summary
			//	Gets a DictionaryIterator for iteration purposes.
			return new main.DictionaryIterator(items);	//	DictionaryIterator
		};
		this.remove=function(/* string */k){
			//	summary
			//	Removes the item at k from the internal collection.
			if(k in items && !testObject[k]){
				delete items[k];
				this.count--;
				return true;	//	bool
			}
			return false;	//	bool
		};

		if (dictionary){
			var e=dictionary.getIterator();
			while(e.get()) {
				 this.add(e.element.key, e.element.value);
			}
		}
	};
	return Dictionary;
});
