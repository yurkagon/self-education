(() => {
  class instChecker {
    static query = 'div[role="dialog"] li a';

    constructor() {
      this.following = null;
      this.followers = null;
    }

    _isPossibleToCalculate() {
    	return Boolean(this.following) && Boolean(this.followers);
    }

    _isFollowingSubscribed(name) {
    	return this.followers.includes(name);
    }

    _isYouSuscribedBack(name) {
    	return this.following.includes(name);
    }

    _calculate() {
    	const nonSubscibedBack = this.following.filter(element =>
      	!this._isFollowingSubscribed(element)
       );
      const userNonSubscribedBack = this.followers.filter(element =>
      	!this._isYouSuscribedBack(element)
      );


      console.group();
      console.log('Users havent subscibe back you');
      console.log(nonSubscibedBack);
      console.groupEnd();


      console.group();
      console.log('You havent subscibe back');
      console.log(userNonSubscribedBack);
      console.groupEnd();
    }

    get setFollowing() {
      this.following = this._getUsersByQuery();

      if (this._isPossibleToCalculate()) {
      	this._calculate();
      }

      return `${this.following.length} users you follow is set`;
    }
    get setFollowers() {
      this.followers = this._getUsersByQuery();

      if (this._isPossibleToCalculate()) {
      	this._calculate();
      }

      return `${this.followers.length} users that follow you is set`;
    }

    _getUsersByQuery() {
      const users = [];
      document.querySelectorAll(instChecker.query).forEach(el => users.push(el.innerText));

      return users.filter(Boolean);
    }
  }
  window.instChecker = new instChecker();

  return 'InstChecker is set';
})();
