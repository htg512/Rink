// JavaScript Document

		// JavaScript Document
		
		var http = require('http');
		var fs = require('fs');
		var socketio = require('socket.io');
		var mysql = require('mysql');
		var connect = require('connect');
		var ejs = require('ejs');
		var joinedRoom = null;
		var roomMessage = null;
		var i=0;

		var server = http.createServer(function(req,res) {
			fs.readFile('chat.html',function(err,data) {
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(data,'utf-8');
			});
		}).listen(3000,function() {
			console.log('Server Started At 3000');
		}); // 서버 실행
		
		var Client = mysql.createConnection( { //mysql 기본 정보 셋팅
			user : 'root',
			password : 'apmsetup',
			database : 'member_db'
		});
		
		var io = socketio.listen(server); 

		io.sockets.on('connection',function(socket) {  
		// 서버 이벤트 관련 코딩 장소
			
			socket.on('join',function(data) {
			//방입장시 set을 통해 고유번호 셋팅
				console.log(data + '입장');
				socket.join(data);
				socket.set('room',data);				

			});
			
			socket.on('message',function(data) {
				//입장한 방 만 메세지를 뿌려줌
				socket.get('room',function(err,room) {
					socket.broadcast.to(room).emit('message',data);
				});
			});
			
			socket.on('data_on',function(data) { // mysql 이벤트 관련 함수 
				Client.query(data, function (err, rs, fields) { // 전달된 쿼리문으로 쿼리 발생 
					if(err) { // 에러 
						console.log(err+'쿼리문장 오류');
					}else{ // 성공시 
						socket.emit('redata',rs[0]); // rs로 보내면 안됨 !! 
					}
				});
			});
			
			socket.on('db_message',function(data) {
				//db에 채팅 내용 입력
				Client.query('INSERT INTO message (name,message) VALUES (?,?)' ,[data.name, data.message]);
			});

			socket.on('test',function(data) {
				// 지금 접속한 시간 전에 있는 데이터 불러오기 
				Client.query(data, function(err,rs,fielfs) {
					if(err){
						console.log(err+'test쿼리 실패');
					}
				
					else{
						while(1){
							if(rs[i] == null)
								break;
							else
								{
									socket.emit('input_load',rs[i]);
									
								}
							i++;
						}
					}
					i=0;
				});
			});
					
				
	
		});  
		  
		  io.configure(function(){ // nodejs server setting 
			io.set('log level', 3);
			io.set('transports', [
				'websocket'
			  , 'flashsocket'
			  , 'htmlfile'
			  , 'xhr-polling'
			  , 'jsonp-polling'
			]);
		  });




	
