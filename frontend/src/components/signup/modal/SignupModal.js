import Button from "components/commons/button";
import React, { useState } from "react";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  padding: 4rem 2rem;
  width: 38rem;
  height: 40rem;
  background: #ffffff;
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;

  .content {
    margin-bottom: 1rem;
    .title {
      height: 2rem;
      display: flex;
      cursor: pointer;
      font-size: 1.2rem;
      align-items: center;
      color: #444444;
      .unChecked {
        font-size: 1.7rem;
        color: #e2e2e2;
        margin-right: 0.2rem;
      }
      .checked {
        font-size: 1.7rem;
        color: #fec25c;
        margin-right: 0.2rem;
      }
    }
    .articles {
      margin-top: 1rem;
      padding: 0 0.5rem;
      height: 10rem;
      overflow: auto;
      border: 1px solid #c4c4c4;
      border-radius: 5px;
      .article {
        margin-bottom: 2rem;
        font-size: 0.8rem;
        line-height: 1.2rem;
        color: #666666;
        .article__title {
          margin-bottom: 0.5rem;
        }
        .article__text {
          a {
            color: #333333;
            text-decoration: none;
          }
        }
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignudivModal = ({ setIsModalOpen, setAgreement }) => {
  const [isChecked, setIsChecked] = useState({
    0: false,
    1: false,
  });

  const onClick = (event) => {
    event.stopPropagation();
  };

  const checkContent = (key) => {
    if (key === "total") {
      if (isChecked[0] && isChecked[1]) {
        setIsChecked({
          0: false,
          1: false,
        });
      } else {
        setIsChecked({
          0: true,
          1: true,
        });
      }
    } else if (key === "0") {
      setIsChecked({
        ...isChecked,
        0: !isChecked[0],
      });
    } else if (key === "1") {
      setIsChecked({
        ...isChecked,
        1: !isChecked[1],
      });
    }
  };
  const onValidCheck = () => {
    if (isChecked[0] && isChecked[1]) {
      setIsModalOpen(false);
      setAgreement(true);
    } else {
      alert("필수약관에 동의해주세요.");
    }
  };

  const onCancle = () => {
    setIsModalOpen(false);
  };

  return (
    <Container onClick={onClick}>
      <div className="content">
        <div
          className="title"
          onClick={() => checkContent("total")}
          // checked={isChecked.total}
        >
          <MdOutlineCheckCircleOutline
            className={isChecked[0] && isChecked[1] ? "checked" : "unChecked"}
          />
          전체 동의합니다.
        </div>
      </div>
      <div className="content">
        <div className="title" onClick={() => checkContent("0")}>
          <MdOutlineCheckCircleOutline
            className={isChecked[0] ? "checked" : "unChecked"}
          />
          드로잉 드림 이용약관 동의
        </div>
        <div className="articles">
          <div class="article">
            <div class="article__title">여러분을 환영합니다.</div>
            <div class="article__text">
              드로잉드림 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서
              감사합니다. 본 약관은 다양한 드로잉드림 서비스의 이용과 관련하여
              드로잉드림 서비스를 제공하는 드로잉드림 (Drawging Dream이하
              ‘드로잉드림’)와 이를 이용하는 드로잉드림 서비스 회원(이하 ‘회원’)
              과의 관계를 설명하며, 아울러 여러분의 드로잉드림 서비스 이용에
              도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
            </div>
            <div class="article__text">
              드로잉드림 서비스를 이용하시거나 드로잉드림 서비스 회원으로
              가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나
              동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기
              바랍니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              다양한 드로잉드림 서비스를 즐겨보세요.
            </div>
            <div class="article__text">
              드로잉드림은{" "}
              <a href="6a607.div.ssafy.io" target="_blank">
                i6a607.div.ssafy.io
              </a>
              을 비롯한 드로잉드림 도메인의 웹사이트을 통해 온라인 수업, 다른
              이용자와의 커뮤니케이션, 콘텐츠 제공 등 학생 여러분의 생활에
              편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다. 여러분은
              divC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의
              드로잉드림 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의
              구체적인 내용은 각 서비스 상의 안내 등에서 쉽게 확인하실 수
              있습니다.
            </div>
            <div class="article__text">
              드로잉드림은 기본적으로 여러분 모두에게 동일한 내용의 서비스를
              제공합니다. 드로잉드림 서비스에는 기본적으로 본 약관이 적용됩니다
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              회원으로 가입하시면 드로잉드림 서비스를 편리하게 이용할 수
              있습니다.
            </div>
            <div class="article__text">
              여러분은 본 약관을 읽고 동의하신 후 회원 가입을 신청하실 수
              있으며, 각 학교 관리자 혹은 선생님이 이에 대한 승낙을 통해 회원
              가입 절차를 완료하고 여러분께 드로잉드림 서비스 이용 계정(이하
              ‘계정’)을 부여합니다. 계정이란 회원이 드로잉드림 서비스에 로그인한
              이후 이용하는 각종 서비스 이용 이력을 회원 별로 관리하기 위해
              설정한 회원 식별 단위를 말합니다. 회원은 자신의 계정을 통해 좀더
              다양한 드로잉드림 서비스를 보다 편리하게 이용할 수 있습니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              여러분이 제공한 콘텐츠를 소중히 다룰 것입니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 게재한 게시물이 드로잉드림 서비스를 통해
              다른 이용자들에게 전달되어 우리 모두의 삶을 더욱 풍요롭게 해줄
              것을 기대합니다. 게시물은 여러분이 타인 또는 자신이 보게 할
              목적으로 드로잉드림 서비스 상에 게재한 부호, 문자, 음성, 음향,
              그림, 사진, 동영상, 링크 등으로 구성된 각종 콘텐츠 자체 또는
              파일을 말합니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분의 생각과 감정이 표현된 콘텐츠를 소중히 보호할
              것을 약속 드립니다. 여러분이 제작하여 게재한 게시물에 대한
              지식재산권 등의 권리는 당연히 여러분에게 있습니다.
            </div>
            <div class="article__text">
              한편, 드로잉드림 서비스를 통해 여러분이 게재한 게시물을 적법하게
              제공하려면 해당 콘텐츠에 대한 저장, 복제, 수정, 공중 송신, 전시,
              배포, 2차적 저작물 작성(단, 번역에 한함) 등의 이용 권한(기한과
              지역 제한에 정함이 없으며, 별도 대가 지급이 없는 라이선스)이
              필요합니다. 게시물 게재로 여러분은 드로잉드림에게 그러한 권한을
              부여하게 되므로, 여러분은 이에 필요한 권리를 보유하고 있어야
              합니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 부여해 주신 콘텐츠 이용 권한을 저작권법 등
              관련 법령에서 정하는 바에 따라 드로잉드림 서비스 내 노출, 서비스
              홍보를 위한 활용, 서비스 운영, 개선 및 새로운 서비스 개발을 위한
              연구, 웹 접근성 등 법률상 의무 준수, 외부 사이트에서의 검색, 수집
              및 링크 허용을 위해서만 제한적으로 행사할 것입니다. 만약, 그 밖의
              목적을 위해 부득이 여러분의 콘텐츠를 이용하고자 할 경우엔 사전에
              여러분께 설명을 드리고 동의를 받도록 하겠습니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 자신이 제공한 콘텐츠에 대한 드로잉드림 또는
              다른 이용자들의 이용 또는 접근을 보다 쉽게 관리할 수 있도록 다양한
              수단을 제공하기 위해 노력하고 있습니다. 여러분은 드로잉드림 서비스
              내에 콘텐츠 수정, 삭제 등의 관리기능이 제공되는 경우 이를 통해
              직접 타인의 이용 또는 접근을 통제할 수 있습니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              여러분의 개인정보를 소중히 보호합니다.
            </div>
            <div class="article__text">
              드로잉드림은 서비스의 원활한 제공을 위하여 회원이 동의한 목적과
              범위 내에서만 개인정보를 수집∙이용하며, 개인정보 보호 관련 법령에
              따라 안전하게 관리합니다. 드로잉드림이 이용자 및 회원에 대해 관련
              개인정보를 안전하게 처리하기 위하여 노력을 기울이고 있습니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 서비스를 이용하기 위해 일정 기간 동안 로그인
              혹은 접속한 기록이 없는 경우, 전자메일, 서비스 내 알림 또는 기타
              적절한 전자적 수단을 통해 사전에 안내해 드린 후 여러분의 정보를
              파기하거나 분리 보관할 수 있으며, 만약 이로 인해 서비스 제공을
              위해 필수적인 정보가 부족해질 경우 부득이 관련 서비스 이용계약을
              해지할 수 있습니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">타인의 권리를 존중해 주세요.</div>
            <div class="article__text">
              여러분이 무심코 게재한 게시물로 인해 타인의 저작권이 침해되거나
              명예훼손 등 권리 침해가 발생할 수 있습니다. 드로잉드림은 이에 대한
              문제 해결을 위해 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’
              및 ‘저작권법’ 등을 근거로 권리침해 주장자의 요청에 따른 게시물
              게시중단, 원 게시자의 이의신청에 따른 해당 게시물 게시 재개 등을
              내용으로 하는 게시중단요청을 할 수 있습니다.
            </div>
            <div class="article__text">
              한편, 드로잉드림 서비스를 통해 타인의 콘텐츠를 이용한다고 하여
              여러분이 해당 콘텐츠에 대한 지식재산권을 보유하게 되는 것은
              아닙니다. 여러분이 해당 콘텐츠를 자유롭게 이용하기 위해서는 그
              이용이 저작권법 등 관련 법률에 따라 허용되는 범위 내에 있거나,
              해당 콘텐츠의 지식재산권자로부터 별도의 이용 허락을 받아야 하므로
              각별한 주의가 필요합니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 드로잉드림 서비스를 마음껏 이용할 수 있도록
              여러분께 드로잉드림 서비스에 수반되는 관련 소프트웨어 사용에 관한
              이용 권한을 부여합니다. 이 경우 여러분의 자유로운 이용은
              드로잉드림이 제시하는 이용 조건에 부합하는 범위 내에서만
              허용됩니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              드로잉드림 서비스 이용과 관련하여 몇 가지 주의사항이 있습니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 드로잉드림 서비스를 자유롭고 편리하게 이용할
              수 있도록 최선을 다하고 있습니다. 다만, 여러분이 드로잉드림
              서비스를 보다 안전하게 이용하고 드로잉드림 서비스에서 여러분과
              타인의 권리가 서로 존중되고 보호받으려면 여러분의 도움과 협조가
              필요합니다. 여러분의 안전한 서비스 이용과 권리 보호를 위해 부득이
              아래와 같은 경우 여러분의 게시물 게재나 드로잉드림 서비스 이용이
              제한될 수 있으므로, 이에 대한 확인 및 준수를 요청 드립니다.
            </div>
            <ul class="article__text">
              <li class="article__text__list">
                회원 가입 시 이름, 이메일, 학교, 소속 등의 정보를 허위로
                기재해서는 안 됩니다. 회원 계정에 등록된 정보는 항상 정확한 최신
                정보가 유지될 수 있도록 관리해 주세요. 자신의 계정을 다른
                사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게
                그 사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의
                계정을 무단으로 사용해서는 안 됩니다.
              </li>
              <li class="article__text__list">
                타인에 대해 직접적이고 명백한 신체적 위협을 가하는 내용의
                게시물, 타인의 자해 행위 또는 자살을 부추기거나 권장하는 내용의
                게시물, 타인의 신상정보, 사생활 등 비공개 개인정보를 드러내는
                내용의 게시물, 타인을 지속적으로 따돌리거나 괴롭히는 내용의
                게시물, 성매매를 제안, 알선, 유인 또는 강요하는 내용의 게시물,
                공공 안전에 대해 직접적이고 심각한 위협을 가하는 내용의 게시물은
                제한될 수 있습니다.
              </li>
              <li class="article__text__list">
                관련 법령상 금지되거나 형사처벌의 대상이 되는 행위를 수행하거나
                이를 교사 또는 방조하는 등의 범죄 관련 직접적인 위험이 확인된
                게시물,
                <sdivan class="article__text">
                  관련 법령에서 홍보, 광고, 판매 등을 금지하고 있는 물건 또는
                  서비스를 홍보, 광고, 판매하는 내용의 게시물,
                </sdivan>{" "}
                타인의 지식재산권 등을 침해하거나 모욕, 사생활 침해 또는
                명예훼손 등 타인의 권리를 침해하는 내용이 확인된 게시물은 제한될
                수 있습니다.
              </li>
              <li class="article__text__list">
                자극적이고 노골적인 성행위를 묘사하는 등 타인에게 성적 수치심을
                유발시키거나 왜곡된 성 의식 등을 야기할 수 있는 내용의 게시물,
                타인에게 잔혹감 또는 혐오감을 일으킬 수 있는 폭력적이고 자극적인
                내용의 게시물,{" "}
                <sdivan class="article__text">
                  본인 이외의 자를 사칭하거나 허위사실을 주장하는 등 타인을
                  기만하는 내용의 게시물,
                </sdivan>
                과도한 욕설, 비속어 등을 계속하여 반복적으로 사용하여 심한
                혐오감 또는 불쾌감을 일으키는 내용의 게시물은 제한될 수
                있습니다.
              </li>
              <li class="article__text__list">
                자동화된 수단을 활용하는 등 드로잉드림 서비스의 기능을
                비정상적으로 이용하여 게재된 게시물, 드로잉드림 각 개별 서비스의
                제공 취지와 부합하지 않는 내용의 게시물은 다른 이용자들의
                정상적인 드로잉드림 서비스 이용에 불편을 초래하고 더 나아가
                드로잉드림의 원활한 서비스 제공을 방해하므로 역시 제한될 수
                있습니다.
              </li>
              <li class="article__text__list">
                <sdivan class="article__text">
                  드로잉드림의 사전 허락 없이 자동화된 수단(예: 매크로 프로그램,
                  로봇(봇), 스파이더, 스크래퍼 등)을 이용하여 드로잉드림 서비스
                  회원으로 가입을 시도 또는 가입하거나, 드로잉드림 서비스에
                  로그인을 시도 또는 로그인하거나, 드로잉드림 서비스 상에
                  게시물을 게재하거나, 드로잉드림 서비스를 통해
                  커뮤니케이션하거나(예: 전자메일, 쪽지 등),
                </sdivan>
                드로잉드림 서비스에 게재된 회원의 아이디(ID), 게시물 등을
                수집하거나, 드로잉드림 검색 서비스에서 특정 질의어로 검색하거나
                혹은 그 검색결과에서 특정 검색결과를 선택(이른바 ‘클릭’)하는 등{" "}
                <sdivan class="article__text">
                  이용자(사람)의 실제 이용을 전제로 하는 드로잉드림 서비스의
                  제공 취지에 부합하지 않는 방식으로 드로잉드림 서비스를
                  이용하거나 이와 같은 드로잉드림 서비스에 대한 어뷰징(남용)
                  행위를 막기 위한 드로잉드림의 기술적 조치를 무력화하려는
                  일체의 행위
                </sdivan>
                (예: Idiv를 지속적으로 바꿔가며 접속하는 행위, Cadivtcha를 외부
                솔루션 등을 통해 우회하거나 무력화 하는 행위 등)를 시도해서는 안
                됩니다.
              </li>
              <li class="article__text__list">
                <sdivan class="article__text">
                  드로잉드림의 동의 없이 자동화된 수단에 의해 드로잉드림 서비스
                  상에 부호, 문자, 음성, 음향, 그림, 사진, 동영상, 링크 등으로
                  구성된 각종 콘텐츠 자체 또는 파일을 삽입
                </sdivan>
                해서는 안 됩니다. 또한, 드로잉드림 서비스 또는 이에 포함된
                소프트웨어를 복사, 수정할 수 없으며, 이를 판매, 양도, 대여 또는
                담보로 제공하거나 타인에게 그 이용을 허락해서는 안 됩니다.
                드로잉드림 서비스에 포함된 소프트웨어를 역 설계, 소스코드 추출
                시도, 복제, 분해, 모방, 기타 변형하는 등의 행위도
                금지됩니다(다만, 오픈소스에 해당되는 경우 그 자체 조건에
                따릅니다).
                <sdivan class="article__text">
                  그 밖에 바이러스나 기타 악성 코드를 업로드하거나 드로잉드림
                  서비스의 원활한 운영을 방해할 목적으로 서비스 기능을
                  비정상적으로 이용하는 행위
                </sdivan>{" "}
                역시 금지됩니다.
              </li>
            </ul>
          </div>
          <div class="article">
            <div class="article__title">
              부득이 서비스 이용을 제한할 경우 합리적인 절차를 준수합니다.
            </div>
            <div class="article__text">
              드로잉드림은 다양한 정보와 의견이 담긴 여러분의 콘텐츠를 소중히
              다룰 것을 약속 드립니다만, 여러분이 게재한 게시물이 관련 법령, 본
              약관, 게시물 운영정책, 각 개별 서비스에서의 약관, 운영정책 등에
              위배되는 경우, 부득이 이를 비공개 또는 삭제 처리하거나 게재를
              거부할 수 있습니다. 다만, 이것이 드로잉드림이 모든 콘텐츠를 검토할
              의무가 있다는 것을 의미하지는 않습니다.
            </div>
            <div class="article__text">
              또한 여러분이 관련 법령, 본 약관, 계정 및 게시물 운영정책, 각 개별
              서비스에서의 약관, 운영정책 등을 준수하지 않을 경우, 드로잉드림은
              여러분의 관련 행위 내용을 확인할 수 있으며, 그 확인 결과에 따라
              드로잉드림 서비스 이용에 대한 주의를 당부하거나, 드로잉드림 서비스
              이용을 일부 또는 전부, 일시 또는 영구히 정지시키는 등 그 이용을
              제한할 수 있습니다. 한편, 이러한 이용 제한에도 불구하고 더 이상
              드로잉드림 서비스 이용계약의 온전한 유지를 기대하기 어려운 경우엔
              부득이 여러분과의 이용계약을 해지할 수 있습니다.
            </div>
            <div class="article__text">
              부득이 여러분의 서비스 이용을 제한해야 할 경우 명백한 법령
              위반이나 타인의 권리침해로서 긴급한 위험 또는 피해 차단이 요구되는
              사안 외에는 위와 같은 단계적 서비스 이용제한 원칙을 준수
              하겠습니다. 명백한 법령 위반 등을 이유로 부득이 서비스 이용을 즉시
              영구 정지시키는 경우 서비스 이용을 통해 획득한 포인트 및 기타 혜택
              등은 모두 소멸되고 이에 대해 별도로 보상하지 않으므로 유의해
              주시기 바랍니다. 서비스 이용 제한의 조건, 세부 내용 등은 계정
              운영정책 및 각 개별 서비스에서의 운영정책을 참고하시기 바랍니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              드로잉드림의 잘못은 드로잉드림이 책임집니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분이 드로잉드림 서비스를 이용함에 있어
              드로잉드림의 고의 또는 과실로 인하여 손해를 입게 될 경우 관련
              법령에 따라 여러분의 손해를 배상합니다. 다만, 천재지변 또는 이에
              준하는 불가항력으로 인하여 드로잉드림이 서비스를 제공할 수 없거나
              이용자의 고의 또는 과실로 인하여 서비스를 이용할 수 없어 발생한
              손해에 대해서 드로잉드림은 책임을 부담하지 않습니다.
            </div>
            <div class="article__text">
              그리고 드로잉드림이 손해배상책임을 부담하는 경우에도 통상적으로
              예견이 불가능하거나 특별한 사정으로 인한 특별 손해 또는 간접 손해,
              기타 징벌적 손해에 대해서는 관련 법령에 특별한 규정이 없는 한
              책임을 부담하지 않습니다.
            </div>
            <div class="article__text">
              한편, 드로잉드림 서비스를 매개로 한 여러분과 다른 회원 간 또는
              여러분과 비회원 간의 의견 교환, 거래 등에서 발생한 손해나 여러분이
              서비스 상에 게재된 타인의 게시물 등의 콘텐츠를 신뢰함으로써 발생한
              손해에 대해서도 드로잉드림은 특별한 사정이 없는 한 이에 대해
              책임을 부담하지 않습니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              언제든지 드로잉드림 서비스 이용계약을 해지하실 수 있습니다.
            </div>
            <div class="article__text">
              드로잉드림에게는 참 안타까운 일입니다만, 회원은 언제든지
              드로잉드림 서비스 이용계약 해지를 신청하여 회원에서 탈퇴할 수
              있으며, 이 경우 드로잉드림은 관련 법령 등이 정하는 바에 따라 이를
              지체 없이 처리하겠습니다.
            </div>
            <div class="article__text">
              드로잉드림 서비스 이용계약이 해지되면, 관련 법령 및
              개인정보처리방침에 따라 드로잉드림이 해당 회원의 정보를 보유할 수
              있는 경우를 제외하고, 해당 회원 계정에 부속된 게시물 일체를 포함한
              회원의 모든 데이터는 소멸됨과 동시에 복구할 수 없게 됩니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              서비스 중단 또는 변경 시 꼭 알려드리겠습니다.
            </div>
            <div class="article__text">
              드로잉드림은 연중 무휴, 1일 24시간 안정적으로 서비스를 제공하기
              위해 최선을 다하고 있습니다만, 컴퓨터, 서버 등 정보통신설비의
              보수점검, 교체 또는 고장, 통신두절 등 운영상 상당한 이유가 있는
              경우 부득이 서비스의 전부 또는 일부를 중단할 수 있습니다.
            </div>
            <div class="article__text">
              한편, 드로잉드림은 서비스 운영 또는 개선을 위해 상당한 필요성이
              있는 경우 서비스의 전부 또는 일부를 수정, 변경 또는 종료할 수
              있습니다.
            </div>
            <div class="article__text">
              이 경우 드로잉드림은 예측 가능한 경우 상당기간 전에 이를 안내하며,
              만약 예측 불가능한 경우라면 사후 지체 없이 상세히 설명하고 안내
              드리겠습니다. 또한 서비스 중단의 경우에는 여러분 자신의 콘텐츠를
              백업할 수 있도록 합리적이고 충분한 기회를 제공하도록 하겠습니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              주요 사항을 잘 안내하고 여러분의 소중한 의견에 귀 기울이겠습니다.
            </div>
            <div class="article__text">
              드로잉드림은 서비스 이용에 필요한 주요사항을 적시에 잘 안내해 드릴
              수 있도록 힘쓰겠습니다. 회원에게 통지를 하는 경우 전자메일, 서비스
              내 알림 또는 기타 적절한 전자적 수단을 통해 개별적으로 알려 드릴
              것이며, 다만 회원 전체에 대한 통지가 필요할 경우엔 7일 이상
              드로잉드림 도메인의 웹사이트에 관련 내용을 게시하도록 하겠습니다.
            </div>
            <div class="article__text">
              드로잉드림은 여러분의 소중한 의견에 귀 기울이겠습니다. 여러분은
              언제든지 담당자에게 서비스 이용과 관련된 의견이나 개선사항을
              전달할 수 있으며, 드로잉드림은 합리적 범위 내에서 가능한 그
              처리과정 및 결과를 여러분께 전달할 수 있도록 하겠습니다.
            </div>
          </div>
          <div class="article">
            <div class="article__title">
              여러분이 쉽게 알 수 있도록 약관 및 운영정책을 게시하며 사전 공지
              후 개정합니다.
            </div>
            <div class="article__text">
              드로잉드림은 수시로 본 약관, 계정 및 게시물 운영정책을 개정할 수
              있습니다만, 관련 법령을 위배하지 않는 범위 내에서 개정할 것이며,
              사전에 그 개정 이유와 적용 일자를 서비스 내에 알리도록 하겠습니다.
              또한 여러분에게 불리할 수 있는 중대한 내용의 약관 변경의 경우에는
              최소 30일 이전에 해당 서비스 내 공지하고 별도의 전자적
              수단(전자메일 등)을 통해 개별적으로 알릴 것입니다.
            </div>
            <div class="article__text">
              드로잉드림은 변경된 약관을 게시한 날로부터 효력이 발생되는 날까지
              약관 변경에 대한 여러분의 의견을 기다립니다. 위 기간이 지나도록
              여러분의 의견이 드로잉드림에 접수되지 않으면, 여러분이 변경된
              약관에 따라 서비스를 이용하는 데에 동의하는 것으로 간주됩니다.
              드로잉드림으로서는 매우 안타까운 일이지만, 여러분이 변경된 약관에
              동의하지 않는 경우 변경된 약관의 적용을 받는 해당 서비스의 제공이
              더 이상 불가능하게 될 수 있습니다.
            </div>
            <div class="article__text">
              본 약관은 한국어를 정본으로 합니다. 본 약관 또는 드로잉드림
              서비스와 관련된 여러분과 드로잉드림과의 관계에는 대한민국의 법령이
              적용됩니다. 그리고 본 약관 또는 드로잉드림 서비스와 관련하여
              여러분과 드로잉드림 사이에 분쟁이 발생할 경우, 그 분쟁의 처리는
              대한민국 '민사소송법'에서 정한 절차를 따릅니다.
            </div>
            <ul class="article__text">
              <li class="article__text__list">공지 일자: 2022년 1월 1일</li>
              <li class="article__text__list">적용 일자: 2022년 1월 1일</li>
            </ul>
            <div class="article__text">
              드로잉드림 서비스와 관련하여 궁금하신 사항이 있으시면
              담당자(e-mail : ldy1853@naver.com)에게 문의 주시기 바랍니다.
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="title" onClick={() => checkContent("1")}>
          <MdOutlineCheckCircleOutline
            className={isChecked[1] ? "checked" : "unChecked"}
          />
          드로잉 드림 개인정보이용 동의
        </div>
        <div className="articles">
          <div class="article">
            <div class="article__title">수집항목</div>
            <ul class="article__text">
              <li class="article__text__list">
                필수 : 아이디, 이름, 비밀번호, 이메일주소, 학교, 학년, 반, 번호
              </li>
              <li class="article__text__list">
                선택 : 전화번호, 보호자 전화번호, 주소
              </li>
            </ul>
            <div class="article__text">
              이용목적 : DrawingDream 서비스 제공, 이용자 식별 및 본인 여부 확인
            </div>
            <div class="article__text">보유 및 이용기간 : 회원탈퇴 시 까지</div>
            <div class="article__text">
              * DrawginDream 서비스 제공을 위하여 필요한 최소한의 개인정보이므로
              동의를 해주셔야 서비스를 이용하실 수 있습니다. * 이 외 서비스
              이용과정에서 별도 동의를 통해 추가정보 수집이 있을 수 있습니다.
            </div>
          </div>
        </div>
      </div>
      <ButtonContainer>
        <Button name="확인" width="6rem" mr="1rem" onClick={onValidCheck} />
        <Button
          name="취소"
          width="6rem"
          bc="#C4C4C4"
          hoverColor="#a2a2a2"
          onClick={onCancle}
        />
      </ButtonContainer>
    </Container>
  );
};

export default SignudivModal;
