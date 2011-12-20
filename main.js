define([], function(){
	//	create versions of Array.forEach and Array.map if needed.
	var foreach = Array.prototype.forEach || function(fn, o){
		var i=0, l = this && this.length || 0;
		if(o){
			for(; i<l; i++) fn.call(o, this[i], i, this);
		} else {
			for(; i<l; i++) fn(this[i], i, this);
		}
	};
	var map = Array.prototype.map || function(fn, o){
		var i=0, l = this && this.length || 0, out = [];
		if(o){
			for(; i<l; i++) out[i] = fn.call(o, this[i], i, this);
		} else {
			for(; i<l; i++) out[i] = fn(this[i], i, this);
		}
		return out;
	};

	var DictionaryEntry=function(/* string */k, /* object */v){
		//	summary
		//	return an object of type DictionaryEntry
		this.key=k;
		this.value=v;
		this.valueOf=function(){
			return this.value; 	//	object
		};
		this.toString=function(){
			return String(this.value);	//	string
		};
	}

	var Iterator=function(/* array */a){
		//	summary
		//	return an object of type Iterator
		var position=0;
		this.element=a[position]||null;
		this.atEnd=function(){
			//	summary
			//	Test to see if the internal cursor has reached the end of the internal collection.
			return (position>=a.length);	//	bool
		};
		this.get=function(){
			//	summary
			//	Get the next member in the collection.
			if(this.atEnd()){
				return null;		//	object
			}
			this.element=a[position++];
			return this.element;	//	object
		};
		this.map=function(/* function */fn, /* object? */scope){
			//	summary
			//	Functional iteration with optional scope.
			return map.call(a, fn, scope);
		};
		this.reset=function(){
			//	summary
			//	reset the internal cursor.
			position=0;
			this.element=a[position];
		};
	}

	var DictionaryIterator=function(/* object */obj){
		//	summary
		//	return an object of type DictionaryIterator
		var a=[];	//	Create an indexing array
		var testObject={};
		for(var p in obj){
			if(!testObject[p]) a.push(obj[p]);	//	fill it up
		}
		var position=0;
		this.element=a[position]||null;
		this.atEnd=function(){
			//	summary
			//	Test to see if the internal cursor has reached the end of the internal collection.
			return (position>=a.length);	//	bool
		};
		this.get=function(){
			//	summary
			//	Get the next member in the collection.
			if(this.atEnd()){
				return null;		//	object
			}
			this.element=a[position++];
			return this.element;	//	object
		};
		this.map=function(/* function */fn, /* object? */scope){
			//	summary
			//	Functional iteration with optional scope.
			return map.call(a, fn, scope);
		};
		this.reset=function() {
			//	summary
			//	reset the internal cursor.
			position=0;
			this.element=a[position];
		};
	};

	return {
		DictionaryEntry: DictionaryEntry,
		Iterator: Iterator,
		DictionaryIterator: DictionaryIterator,
		forEach: foreach
	};
});
