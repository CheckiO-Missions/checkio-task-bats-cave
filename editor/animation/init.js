//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new BatsBunkerCanvas($content.find(".explanation")[0]);
            canvas.createCanvas(checkioInput, 0);
            canvas.animateCanvas(rightResult, explanation);


            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
        var tCanvas;
        var tooltip = false;
//
        ext.set_console_process_ret(function (this_e, ret) {


            $tryit.find(".checkio-result-in").html("<br>" + ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
            $tryit.find(".tryit-canvas").mouseenter(function(e) {
                if (tooltip) {
                    return false;
                }
                var $tooltip = $tryit.find(".tryit-canvas .tooltip");
                $tooltip.fadeIn(1000);
                setTimeout(function() {
                    $tooltip.fadeOut(1000);
                }, 2000);
                tooltip = true;
            });
            tCanvas = new BatsBunkerCanvas($tryit.find(".tryit-canvas")[0]);
            tCanvas.createCanvas([
                "B----",
                "-----",
                "-----",
                "-----",
                "----A"
            ], 0);
            tCanvas.feedbackCanvas();

            $tryit.find('.bn-check').click(function (e) {
                e.preventDefault();
                this_e.sendToConsoleCheckiO(tCanvas.bunkerMap());
                e.stopPropagation();
                return false;
            });

        });







        function BatsBunkerCanvas(dom) {
            var batPath = "M-0.623,-20 C-0.235,-17.643 -0.147,-15.24 -0.14,-12.846 C0.359,-13.028 0.94,-13.132 1.565,-13.132 C2.317,-13.132 3.009,-12.984 3.56,-12.724 C4.193,-15.346 4.944,-17.716 5.741,-19.704 C5.972,-17.473 5.972,-14.729 5.733,-11.708 C5.6,-6.186 9.746,-9.077 11.324,-13.011 C11.748,-14.052 13.051,-15.684 14.569,-15.485 C22.921,-14.339 25.824,-3.894 24.804,4.259 C24.767,4.546 24.723,4.667 24.671,4.685 C23.569,-0.863 21.083,-4.641 19.147,-4.076 C17.212,-3.521 16.512,1.038 17.443,6.508 C17.443,6.56 17.435,6.578 17.42,6.56 C16.758,5.805 16.118,5.301 15.5,4.997 C14.435,4.329 13.356,4.033 12.351,4.216 C10.296,4.589 9.076,6.873 8.949,9.998 C8.934,10.042 8.912,10.094 8.897,10.146 C8.852,10.259 8.823,9.92 8.785,9.807 C5.22,-0.412 1.267,22.076 -4.725,18.256 C-5.313,17.882 -5.686,17.691 -5.834,17.691 C-6.14,17.691 -6.393,18.151 -6.594,19.072 C-6.72,19.657 -6.998,20 -7.516,20 C-8.615,19.688 -9.289,18.277 -9.869,17.257 C-9.348,17.587 -8.909,17.752 -8.559,17.752 C-8.097,17.752 -7.77,17.361 -7.576,16.562 C-7.427,15.972 -7.122,14.426 -6.393,14.426 C-6.177,14.426 -5.916,14.618 -5.626,14.991 C-3.437,17.326 -1.815,15.26 -2.008,12.16 C-2.261,8.036 -4.8,3.434 -9.177,8.045 C-9.311,8.184 -9.586,8.705 -9.579,8.487 C-9.348,2.436 -14.305,1.411 -18.154,5.275 C-17.841,-2.496 -23.179,-1.688 -24.801,1.689 C-24.868,1.828 -24.98,1.811 -24.98,1.802 C-25.441,-4.25 -17.908,-13.809 -12.832,-13.653 C-11.134,-13.592 -9.809,-12.038 -9.348,-11.3 C-8.894,-10.562 -7.68,-8.096 -6.668,-7.931 C-5.663,-7.775 -3.847,-7.818 -3.117,-9.798 C-2.931,-10.293 -2.767,-10.857 -2.619,-11.43 C-2.249,-14.035 -1.614,-16.565 -0.917,-19.071 z M4.498,-8.209 L2.175,-6.794 C2.364,-6.608 2.407,-6.54 2.69,-6.433 C3.285,-6.207 4.084,-6.454 4.425,-7.094 C4.591,-7.405 4.586,-7.617 4.561,-7.951 z M-2.202,-7.827 C-2.249,-7.523 -2.295,-7.4 -2.18,-7.057 C-1.909,-6.248 -0.889,-6.036 -0.273,-6.355 C0.044,-6.52 0.082,-6.61 0.27,-6.863 z M4.743,-4.476 C4.647,-4.345 4.483,-4.198 4.252,-4.033 C4.163,-3.972 4.058,-3.902 3.947,-3.842 L3.939,-3.034 C4.401,-3.512 4.669,-3.989 4.743,-4.476 z M-2.187,-4.432 C-2.116,-3.968 -1.923,-3.685 -1.68,-3.338 C-1.554,-3.182 -1.413,-3.034 -1.249,-2.886 L-1.264,-3.746 C-1.736,-4.013 -1.476,-3.849 -2.033,-4.263 z M3.195,-3.512 C2.622,-3.312 1.982,-3.216 1.275,-3.216 C0.612,-3.216 0.002,-3.303 -0.549,-3.477 L-1.078,-2.748 C-0.362,-2.25 0.443,-2.137 1.26,-2.114 C2.265,-2.114 3.069,-2.357 3.686,-2.826 z";

            Raphael.fn.bat = function (x, y, sizeX, sizeY) {
                var h = 50,
                    v = 40;
                var p = this.path(batPath);
                p.transform(Raphael.format("t{0},{1}",
                    x,
                    y));
                p.scale(sizeX / h, sizeY / v);
                return p;
            };

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var cell = 40;

            var pad = 10;

            var step = 10;
            var speedCoof = 0.5;

            var fullSizeX;
            var fullSizeY;

            var bunker;
            var timer;
            var paper;
            var batSet;
            var cellSet;

            var batSizeX = cell * 5 / 6;
            var batSizeY = cell * 2 / 3;

            var attrCell = {"stroke": colorBlue4, "fill": colorBlue1, "stroke-width": 2};
            var attrWall = {"stroke": colorBlue4, "fill": colorBlue4, "stroke-width": 2};
            var attrLine = {"stroke": colorOrange4, "stroke-width": 3};
            var attrBat = {"fill": colorGrey4, "stroke": colorGrey4, "stroke-width": 0};
            var attrLeader = {"fill": colorBlue4, "stroke": colorBlue4, "stroke-width": 0};
            var attrTimer = {"font-family": "verdana", "font-size": cell * 0.8, "stroke": colorBlue4};

            this.createCanvas = function (map, extended) {
                fullSizeX = map[0].length * cell + 2 * pad;
                fullSizeY = (map.length) * cell + extended * cell + 2 * pad;
                paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
                batSet = paper.set();
                cellSet = paper.set();
                bunker = [];
                for (var row = 0; row < map.length; row++) {
                    for (var col = 0; col < map[0].length; col++) {
                        batSet.push({});
                        var r = paper.rect(pad + col * cell, pad + row * cell, cell, cell).attr(attrCell);
                        cellSet.push(r);
                        var ch = map[row][col];
                        if (ch === "W") {
                            r.attr(attrWall);
                            continue;
                        }
                        if (ch === "B" || ch === "A") {
                            var bat = paper.bat((col + 0.5) * cell + pad, (row + 0.5) * cell + pad, batSizeX, batSizeY);
                            batSet[row * map[0].length + col] = bat;
                            bat.attr(ch === "B" ? attrBat : attrLeader);
                        }
                    }
                    bunker.push(map[row].split(""));

                }

//                timer = paper.text(fullSizeX / 2, (row + 0.5) * cell, "0.00").attr(attrTimer);
            };

            this.animateCanvas = function(ans, expl) {
                var j = 0;
                for (var i = 0; i < expl.length - 1; i++) {
                    setTimeout(function(){
                        var start = "M" + ((expl[j][1] + 0.5) * cell + pad) + "," + ((expl[j][0] + 0.5) * cell + pad);
                        var p = paper.path(start).attr(attrLine);
                        batSet.toFront();
                        var end = "L" + ((expl[j+1][1] + 0.5) * cell + pad) + "," + ((expl[j+1][0] + 0.5) * cell + pad);
                        var period = expl[j+1][2] - expl[j][2];
                        p.animate({"path": start + end}, period * 1000 * speedCoof);
                        j++;
                    }, expl[i][2] * 1000 * speedCoof)
                }
            };

            this.bunkerMap = function() {
                var res = [];
                for (var i = 0; i < bunker.length; i++) {
                    res.push(bunker[i].join(""));
                }
                return res;
            };

            this.feedbackCanvas = function() {
                // it's from css -- be carefull
                // TODO: get x0 from css

                var obj = this;
                var x0 = 10;
                var y0 = 10;
                var width = bunker[0].length;

                var cycle = "-BWA";
                var active = paper.rect(pad, pad, bunker[0].length * cell, bunker.length * cell + pad).attr(
                    {"fill": colorBlue2, "opacity": 0, "opacity-fill": 0});
                active.click(function(e) {
                    console.log(e);
                    var Y = e.layerY;
                    var X = e.layerX;

                    var row = Math.floor((Y - pad) / cell);
                    var col = Math.floor((X - pad) / cell);
                    var ch = bunker[row][col];
                    var next_ch = cycle[(cycle.indexOf(ch) + 1) % 4];
                    if (ch == "B" || ch == "A") {
                        batSet[row * width + col].remove();
                    }
                    if (ch == "W") {
                        cellSet[row * width + col].attr(attrCell);
                    }
                    bunker[row][col] = next_ch;
                    if (next_ch == "W") {
                        cellSet[row * width + col].attr(attrWall);
                    }
                    if (next_ch == "B" || next_ch == "A") {
                        var bat = paper.bat((col + 0.5) * cell + pad, (row + 0.5) * cell + pad, batSizeX, batSizeY);
                        batSet[row * width + col] = bat;
                        bat.attr(next_ch === "B" ? attrBat : attrLeader);
                    }
                    active.toFront();

                });
            };



        }


    }
);
