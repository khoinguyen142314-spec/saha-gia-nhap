/* Trang tài liệu tương tác SAHA — tìm kiếm, thanh tiến độ, hiện dần, trò chơi tình huống */
(function(){
  var td=document.getElementById('tien-do');
  addEventListener('scroll',function(){var h=document.documentElement;td.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});

  // Hiện dần khi cuộn
  var dt=document.querySelectorAll('.buoc,.the-gt,.cau,.th,.dau-nhom');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('vao');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
    dt.forEach(function(x){x.classList.add('hien-dan');io.observe(x)});
  }

  // Đánh dấu mục đang xem trên thanh
  var lk=[].slice.call(document.querySelectorAll('.thanh a'));
  var muc=lk.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  if('IntersectionObserver' in window&&muc.length){
    var io2=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){lk.forEach(function(a){a.classList.toggle('dang',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    muc.forEach(function(m){io2.observe(m)});
  }

  // Tìm kiếm không dấu
  function bo(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase()}
  var o=document.getElementById('tim'),kt=document.getElementById('khong-thay');
  var cau=[].slice.call(document.querySelectorAll('.cau'));
  cau.forEach(function(c){c._t=bo(c.textContent)});
  var hen;
  o&&o.addEventListener('input',function(){clearTimeout(hen);hen=setTimeout(loc,120)});
  function loc(){
    var q=bo(o.value.trim()),tu=q.split(/\s+/).filter(Boolean),co=0;
    cau.forEach(function(c){var ok=!tu.length||tu.every(function(t){return c._t.indexOf(t)>=0});c.classList.toggle('an',!ok);if(ok)co++;c.open=!!tu.length&&ok&&co<=3});
    document.querySelectorAll('.nhom').forEach(function(n){n.classList.toggle('an',!!tu.length&&!n.querySelector('.cau:not(.an)'))});
    kt.classList.toggle('hien',!!tu.length&&!co);
    if(tu.length){var m=document.getElementById('hoi-dap');if(m.getBoundingClientRect().top>innerHeight*.6)m.scrollIntoView({behavior:'smooth'})}
  }

  // Trò chơi tình huống
  var diem=0,lam=0,th=document.querySelectorAll('.th'),dd=document.getElementById('diem'),ket=document.getElementById('ket');
  th.forEach(function(t){t.querySelectorAll('.chon').forEach(function(b){b.addEventListener('click',function(){
    if(t.classList.contains('xong'))return;
    t.classList.add('xong');lam++;
    if(b.dataset.dung==='1'){b.classList.add('dung');diem++}else{b.classList.add('sai');t.querySelector('.chon[data-dung="1"]').classList.add('dung')}
    dd.textContent=diem;
    if(lam===th.length){var tl=diem/th.length;ket.innerHTML=(tl>=.8?'🏆 Xuất sắc! ':tl>=.5?'🌱 Tốt lắm! ':'💪 Cố lên! ')+'Bạn đúng '+diem+'/'+th.length+' tình huống.<br><small>'+(tl>=.8?'Bạn đã sẵn sàng làm người SAHA.':'Đọc lại phần giải thích, rồi chơi lại để thuộc cách SAHA làm.')+'</small>';ket.classList.add('hien');ket.scrollIntoView({behavior:'smooth',block:'center'})}
  })})});
})();
